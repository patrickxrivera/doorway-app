const models = require("../models");

const run = async () => {
    const internetIdentity = await models.internetIdentity.findOne();
    console.log({internetIdentity});
}

run();