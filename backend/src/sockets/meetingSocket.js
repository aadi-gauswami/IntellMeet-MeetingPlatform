import EVENTS from "./socketEvents.js";
import activeMeetings from "./activeMeetings.js";

const registerMeetingSocket = (io, socket) => {


    socket.on(EVENTS.MEETING.JOIN_ROOM, async (meetingId) => {

        socket.join(meetingId);

        // Create room if not exists
        if (!activeMeetings.has(meetingId)) {

            activeMeetings.set(meetingId, {
                participants: new Map()
            });

        }

        const room = activeMeetings.get(meetingId);

        room.participants.set(
            socket.user._id.toString(),
            socket.id
        );

        // Notify others
        socket.to(meetingId).emit(
            EVENTS.MEETING.PARTICIPANT_JOINED,
            {
                user: {
                    id: socket.user._id,
                    name: socket.user.name,
                    email: socket.user.email
                }
            }
        );

        io.to(meetingId).emit(
            "participant-list",
            {
                count: room.participants.size,
                participants: Array.from(room.participants.keys())
            }
        );

        console.log(
            `${socket.user.name} joined meeting ${meetingId}`
        );

    });

    
    socket.on(EVENTS.MEETING.LEAVE_ROOM, (meetingId) => {

        socket.leave(meetingId);

        const room = activeMeetings.get(meetingId);

        if (!room) return;

        room.participants.delete(
            socket.user._id.toString()
        );

        socket.to(meetingId).emit(
            EVENTS.MEETING.PARTICIPANT_LEFT,
            {
                userId: socket.user._id
            }
        );

        io.to(meetingId).emit(
            "participant-list",
            {
                count: room.participants.size,
                participants: Array.from(room.participants.keys())
            }
        );

        if (room.participants.size === 0) {

            activeMeetings.delete(meetingId);

        }

        console.log(
            `${socket.user.name} left meeting ${meetingId}`
        );

    });

    
    socket.on(EVENTS.CONNECTION.DISCONNECT, () => {

        activeMeetings.forEach((room, meetingId) => {

            if (
                room.participants.has(
                    socket.user._id.toString()
                )
            ) {

                room.participants.delete(
                    socket.user._id.toString()
                );

                socket.to(meetingId).emit(
                    EVENTS.MEETING.PARTICIPANT_LEFT,
                    {
                        userId: socket.user._id
                    }
                );

                io.to(meetingId).emit(
                    "participant-list",
                    {
                        count: room.participants.size,
                        participants: Array.from(
                            room.participants.keys()
                        )
                    }
                );

                if (room.participants.size === 0) {

                    activeMeetings.delete(meetingId);

                }

            }

        });

    });

};

export default registerMeetingSocket;