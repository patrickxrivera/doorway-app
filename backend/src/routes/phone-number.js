const PhoneNumberService = require("../services/phone-number");

const setupPhoneNumberRoutes = (server) => {
    server.post("/phone-number", async (req, res, next) => {
        try {
            const { number } = req.body;

            await PhoneNumberService.create(number);
            
            res.json({ success: true });
        } catch (e) {
            next(e);
        }
    });
}

module.exports = { setupPhoneNumberRoutes };