const setupHealthChecks = (server) => {
    server.get("/", (req, res) => {
        res.json({ greeting: "Welcome to Micro!" })
    });
}

module.exports = { setupHealthChecks };