const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config");
const ErrorHandler = require("../services/error-handler");

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        const decodedToken = jwt.verify(token, jwtSecretKey);
        
        const { userId } = decodedToken;
        
        req.userId = userId;
        
        next();
    } catch (e) {
        ErrorHandler.run(e, req, res, next);
    }
}

module.exports = auth;