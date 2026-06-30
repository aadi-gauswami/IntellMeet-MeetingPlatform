import EVENTS from "./socketEvents.js";
import activeRecordings from "./activeRecordings.js";

const registerRecordingSocket = (io, socket) => {


    socket.on(EVENTS.RECORDING.START, ({ meetingId }) => {

        const recording = {

            userId: socket.user._id,

            socketId: socket.id,

            name: socket.user.name,

            startedAt: new Date(),

            status: "recording"

        };

        activeRecordings.set(meetingId, recording);

        io.to(meetingId).emit(
            EVENTS.RECORDING.START,
            recording
        );

        console.log(`${socket.user.name} started recording`);

    });

    socket.on(EVENTS.RECORDING.PAUSE, ({ meetingId }) => {

        const recording = activeRecordings.get(meetingId);

        if (!recording) return;

        recording.status = "paused";

        io.to(meetingId).emit(
            EVENTS.RECORDING.PAUSE,
            recording
        );

    });

    socket.on(EVENTS.RECORDING.RESUME, ({ meetingId }) => {

        const recording = activeRecordings.get(meetingId);

        if (!recording) return;

        recording.status = "recording";

        io.to(meetingId).emit(
            EVENTS.RECORDING.RESUME,
            recording
        );

    });

    socket.on(EVENTS.RECORDING.STOP, ({ meetingId }) => {

        const recording = activeRecordings.get(meetingId);

        if (!recording) return;

        activeRecordings.delete(meetingId);

        io.to(meetingId).emit(
            EVENTS.RECORDING.STOP,
            {
                userId: socket.user._id
            }
        );

        console.log(`${socket.user.name} stopped recording`);

    });

    socket.on(EVENTS.RECORDING.STATUS, ({ meetingId }) => {

        const recording = activeRecordings.get(meetingId);

        if (!recording) return;

        socket.emit(
            EVENTS.RECORDING.STATUS,
            recording
        );

    });


    socket.on("disconnect", () => {

        for (const [meetingId, recording] of activeRecordings.entries()) {

            if (recording.socketId === socket.id) {

                activeRecordings.delete(meetingId);

                io.to(meetingId).emit(
                    EVENTS.RECORDING.STOP,
                    {
                        userId: recording.userId
                    }
                );

            }

        }

    });

};

export default registerRecordingSocket;