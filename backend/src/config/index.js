const { isProdEnv } = require("../utils");
const productionConfig = require("./production");
const developmentConfig = require("./development");
const sharedConfig = require("./shared");

const config = isProdEnv() ? productionConfig : developmentConfig;

module.exports = {
    ...sharedConfig,
    ...config
}