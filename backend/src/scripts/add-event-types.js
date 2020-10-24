const models = require("../models");
const { EVENT_TYPES } = require("../utils/constants");

const run = async () => {
    try {
        for (let eventType of Object.values(EVENT_TYPES)) {
            await models.eventType.create({
                type: eventType.name,
                points: eventType.points
            })
        }
    } catch (e) {
        console.log({e})
    }

    process.exit();
}

run();