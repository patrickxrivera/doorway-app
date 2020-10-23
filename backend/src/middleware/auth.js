const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config");
const ErrorHandler = require("../services/error-handler");
const models = require("../models");
const { INTERNET_IDENTITY_TYPES } = require("../utils/constants");

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        const decodedToken = jwt.verify(token, jwtSecretKey);
        
        const { userId } = decodedToken;

        req.userId = userId;

        const twitterInternetIdentity = await models.internetIdentity.findOne({
            where: {
                userId,
                identityType: INTERNET_IDENTITY_TYPES.TWITTER
            }
        });

        if (twitterInternetIdentity) {
            const { data } = twitterInternetIdentity;
            req.accessTokens = data
        }
        
        next();
    } catch (e) {
        ErrorHandler.run(e, req, res, next);
    }
}

module.exports = auth;