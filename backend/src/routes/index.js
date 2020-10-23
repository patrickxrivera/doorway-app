const setupHealthChecks = require("./health-checks");
const setupWebhooks = require("./webhooks");
const setupTwitterRoutes = require("./twitter")
const setupGateRoutes = require("./gate")

const setupRoutes = (server, { auth }) => {
    setupHealthChecks(server);
    setupWebhooks(server);
    setupTwitterRoutes(server, { auth });
    setupGateRoutes(server, { auth });
}

module.exports = setupRoutes;