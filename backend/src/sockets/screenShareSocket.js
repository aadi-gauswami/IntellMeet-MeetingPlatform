import EVENTS from "./socketEvents.js";
import activeScreenShares from "./activeScreenShare.js";

const registerScreenShareSocket = (io, socket) => {


    socket.on(EVENTS.SCREEN.START, ({ meetingId }) => {

        const presenter = {
            userId: socket.user._id,
            socketId: socket.id,
            name: socket.user.name,
            startedAt: new Date()
        };

        activeScreenShares.set(meetingId, presenter);

        io.to(meetingId).emit(
            EVENTS.SCREEN.START,
            presenter
        );

        io.to(meetingId).emit(
            EVENTS.SCREEN.PRESENTER_CHANGED,
            presenter
        );

        console.log(`${socket.user.name} started screen sharing`);
    });

    socket.on(EVENTS.SCREEN.STOP, ({ meetingId }) => {

        activeScreenShares.delete(meetingId);

        io.to(meetingId).emit(
            EVENTS.SCREEN.STOP,
            {
                userId: socket.user._id
            }
        );

        console.log(`${socket.user.name} stopped screen sharing`);
    });

    socket.on(EVENTS.SCREEN.PRESENTING, ({ meetingId }) => {

        const presenter = activeScreenShares.get(meetingId);

        if (!presenter) return;

        socket.emit(
            EVENTS.SCREEN.PRESENTING,
            presenter
        );

    });

    socket.on("disconnect", () => {

        for (const [meetingId, presenter] of activeScreenShares.entries()) {

            if (presenter.socketId === socket.id) {

                activeScreenShares.delete(meetingId);

                io.to(meetingId).emit(
                    EVENTS.SCREEN.STOP,
                    {
                        userId: presenter.userId
                    }
                );

                break;
            }
        }

    });

};

export default registerScreenShareSocket;