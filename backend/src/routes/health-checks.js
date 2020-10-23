const setupHealthChecks = (server) => {
    server.get("/", (req, res) => {
        res.json({ greeting: "Welcome to Doorway!" })
    });
}

module.exports = setupHealthChecks;