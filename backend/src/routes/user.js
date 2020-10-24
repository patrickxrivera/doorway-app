const UserService = require("../services/user");

const setupUserRoutes = (server, { auth }) => {
    server.get("/user/position", auth, async (req, res, next) => {
        try {
            const { userId } = req;

            const position = await UserService.position(userId);
            
            res.json({ position });
        } catch (e) {
            next(e);
        }
    });
}

module.exports = { setupUserRoutes };