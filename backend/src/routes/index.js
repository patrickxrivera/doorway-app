const { setupHealthChecks } = require("./health-checks");
const { setupWebhooks } = require("./webhooks");
const { setupUserRoutes } = require("./user")
const { setupTwitterRoutes } = require("./twitter")

const setupRoutes = (server, { auth }) => {
    setupHealthChecks(server);
    setupWebhooks(server);
    setupUserRoutes(server);
    setupTwitterRoutes(server, { auth });
}

module.exports = { setupRoutes };