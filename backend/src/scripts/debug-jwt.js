require("dotenv").config();

const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config");

const run = () => {
    const userDetails = {
        userId: 1
    }
    
    const jwtToken = jwt.sign(userDetails, jwtSecretKey);
}

run();