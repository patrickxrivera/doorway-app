const LeaderboardService = require("../services/leaderboard");

const setupLeaderboardRoutes = (server) => {
    server.get("/leaderboard", async (req, res, next) => {
        try {
            const leaderboard = await LeaderboardService.fetch();
            
            res.json({ leaderboard });
        } catch (e) {
            next(e);
        }
    });

    server.get("/leaderboard/top", async (req, res, next) => {
        try {
            const leaderboard = await LeaderboardService.fetch({ limit: 5 });
            
            res.json({ leaderboard });
        } catch (e) {
            next(e);
        }
    });
}

module.exports = {
    setupLeaderboardRoutes
}