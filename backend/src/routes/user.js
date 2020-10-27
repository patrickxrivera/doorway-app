const UserService = require("../services/user");
const EventService = require("../services/event");

const setupUserRoutes = (server, { auth }) => {
    server.get("/user/position", auth, async (req, res, next) => {
        try {
            const { userId } = req;

            const position = await UserService.position(userId);
            const totalPoints = await EventService.totalPoints();
            const pointsByUserId = await EventService.pointsByUserId(userId);

            const odds = parseFloat(pointsByUserId / totalPoints).toFixed(2) * 100 + "%";
            
            res.json({ position, odds });
        } catch (e) {
            next(e);
        }
    });
}

module.exports = { setupUserRoutes };