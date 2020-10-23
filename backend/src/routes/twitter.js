const TwitterService = require("../services/twitter");
const models = require("../models")
const { INTERNET_IDENTITY_TYPES } = require("../utils/constants");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config");

const setupTwitterRoutes = (server, { auth }) => {
    server.get("/twitter/request-token", async (req, res, next) => {
        try {
            const requestToken = await TwitterService.getRequestToken();
            res.json(requestToken);
        } catch (e) {
            next(e);
        }
    });

    server.post("/twitter/access-token", async (req, res, next) => {
        try {
            const { 
                oauth_token,
                oauth_token_secret,
                user_id,
                screen_name
            } = await TwitterService.getAccessToken(req.body);

            const existingInternetIdentity = await models.internetIdentity.findOne({
                where: { 
                    identityId: user_id,
                    identityType: INTERNET_IDENTITY_TYPES.TWITTER
                }
            });

            if (existingInternetIdentity) {
                const { userId } = existingInternetIdentity;

                const userDetails = { userId };
                
                const token = jwt.sign(userDetails, jwtSecretKey);

                res.json({ token })
            } else {
                const user = await models.user.create();
                
                await models.internetIdentity.create({
                    identityId: user_id,
                    identityType: INTERNET_IDENTITY_TYPES.TWITTER,
                    screenName: screen_name,
                    userId: user.id,
                    data: {
                        oAuthToken: oauth_token,
                        oAuthTokenSecret: oauth_token_secret
                    }
                });

                const userDetails = {
                    userId: user.id
                }
                
                const token = jwt.sign(userDetails, jwtSecretKey);
                
                res.json({ token })
            };
        } catch (e) {
            next(e);
        }
    });

    server.post("/twitter/follow", auth, async (req, res, next) => {
        try {
            const { accessTokens } = req;

            const response = await TwitterService.follow(accessTokens);
            
            res.json(response);
        } catch (e) {
            next(e);
        }
    });

    server.post("/twitter/validate-screen-names", auth, async (req, res, next) => {
        try {
            const { screenNames } = req.body;
            const { accessTokens } = req;
            
            const { 
                validScreenNames, 
                invalidScreenNames 
            } = await TwitterService.validateScreenNames(screenNames, accessTokens);
            
            res.json({ validScreenNames, invalidScreenNames });
        } catch (e) {
            next(e);
        }
    })
}

module.exports = { setupTwitterRoutes };