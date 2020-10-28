const models = require("../models");
const { EVENT_TYPES } = require("../utils/constants");

const PRODUCT_HUNT_REFERRAL_CODE = "phfam";

const run = async () => {
    try {
        await models.referralCode.create({
            code: PRODUCT_HUNT_REFERRAL_CODE
        })
    } catch (e) {
        console.log({e})
    }

    process.exit();
}

run();