const models = require("../models");
const { INTERNET_IDENTITY_TYPES } = require("../utils/constants");

const setupGateRoutes = (server, { auth }) => {
    server.post("/gate", auth, async (req, res, next) => {
        try {
            const { userId } = req;
            const { title, description, link, screenNames } = req.body;

            const gate = await models.gate.create({
                userId,
                title,
                description,
                link
            });

            let gateInternetIdentities = [];

            for (let screenName of screenNames.split(",")) {
                const existingInternetIdentity = await models.internetIdentity.findOne({
                    where: {
                        identityType: INTERNET_IDENTITY_TYPES.TWITTER,
                        screenName
                    }
                })

                if (existingInternetIdentity) {
                    gateInternetIdentities.push(({
                        internetIdentityId: existingInternetIdentity.id,
                        gateId: gate.id
                    }));
                } else {

                }
            }

            await models.gateInternetIdentity.bulkCreate(gateInternetIdentities);

            res.json({
                gate: {

                },
                gateInternetIdentities: []
            });

            // for each screenName
                // check if we have an internet identity record for it
                // if so,
                    // return the internetIdentityId
                // else
                    // query the twitter API using the screenName
                    // save the details in the internet identity table
                    // return the internetIdentityId
            // bulkCreate gateInternetIdentities using the gateId and internetIdentityIds
            // return the gate info and info on the internetIdentities to be rendered on the client
            res.json({success: true})
        } catch (e) {
            next(e);
        }
    });
}

module.exports = setupGateRoutes;