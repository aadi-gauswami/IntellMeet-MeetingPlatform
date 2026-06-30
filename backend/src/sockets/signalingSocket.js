import EVENTS from "./socketEvents.js";

const registerSignalingSocket = (io, socket) => {

    
    socket.on(EVENTS.SIGNALING.READY, ({ meetingId }) => {

        socket.to(meetingId).emit(
            EVENTS.SIGNALING.PEER_JOINED,
            {
                userId: socket.user._id,
                socketId: socket.id,
                name: socket.user.name
            }
        );

    });

    socket.on(EVENTS.SIGNALING.OFFER, (payload) => {

        const {
            targetSocketId,
            offer
        } = payload;

        io.to(targetSocketId).emit(
            EVENTS.SIGNALING.OFFER,
            {
                offer,
                from: socket.id,
                userId: socket.user._id,
                name: socket.user.name
            }
        );

    });

    // SDP Answer
    socket.on(EVENTS.SIGNALING.ANSWER, (payload) => {

        const {
            targetSocketId,
            answer
        } = payload;

        io.to(targetSocketId).emit(
            EVENTS.SIGNALING.ANSWER,
            {
                answer,
                from: socket.id,
                userId: socket.user._id
            }
        );

    });

    // ICE Candidate
    socket.on(EVENTS.SIGNALING.ICE_CANDIDATE, (payload) => {

        const {
            targetSocketId,
            candidate
        } = payload;

        io.to(targetSocketId).emit(
            EVENTS.SIGNALING.ICE_CANDIDATE,
            {
                candidate,
                from: socket.id
            }
        );

    });

    socket.on("disconnect", () => {

        socket.broadcast.emit(
            EVENTS.SIGNALING.PEER_LEFT,
            {
                socketId: socket.id,
                userId: socket.user._id
            }
        );

    });

};

export default registerSignalingSocket;