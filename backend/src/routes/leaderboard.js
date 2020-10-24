const LeaderboardService = require("../services/leaderboard");

const setupLeaderboardRoutes = (server, { auth }) => {
    server.get("/leaderboard", auth, async (req, res, next) => {
        try {
            const leaderboard = await LeaderboardService.fetch();
            
            res.json({ leaderboard });
        } catch (e) {
            next(e);
        }
    });
}

module.exports = {
    setupLeaderboardRoutes
}