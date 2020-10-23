const setupWebhooks = (server) => {
    server.post("webhooks/stripe", (req, res) => {
        res.json({ text: "Received Stripe webhook" })
    })
}

module.exports = { setupWebhooks };
