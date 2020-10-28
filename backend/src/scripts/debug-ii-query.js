const models = require("../models");
const { INTERNET_IDENTITY_TYPES } = require("../utils/constants");

const run = async () => {
    try {
        const user_id = '1318633718702067725';

        const existingInternetIdentity = await models.internetIdentity.findOne({
            where: { 
                identityId: user_id,
                identityType: INTERNET_IDENTITY_TYPES.TWITTER
            }
        });

        console.log({existingInternetIdentity})
    } catch (e) {
        console.log({e})
    }

    process.exit();
}

run();