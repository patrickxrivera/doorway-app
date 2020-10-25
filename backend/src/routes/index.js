const { setupHealthChecks } = require("./health-checks");
const { setupWebhooks } = require("./webhooks");
const { setupUserRoutes } = require("./user")
const { setupTwitterRoutes } = require("./twitter")
const { setupReferralRoutes } = require("./referral");
const { setupLeaderboardRoutes } = require("./leaderboard");
const { setupPhoneNumberRoutes } = require("../routes/phone-number");

const setupRoutes = (server, { auth }) => {
    setupHealthChecks(server);
    setupWebhooks(server);
    setupUserRoutes(server, { auth });
    setupTwitterRoutes(server, { auth });
    setupReferralRoutes(server, { auth });
    setupLeaderboardRoutes(server);
    setupPhoneNumberRoutes(server);
}

module.exports = { setupRoutes };