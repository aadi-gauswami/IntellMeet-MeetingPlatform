export const healthCheck = (req, res) => {

    res.status(200).json({

        success: true,

        message: "IntellMeet Backend Running",

        timestamp: new Date()

    });

};