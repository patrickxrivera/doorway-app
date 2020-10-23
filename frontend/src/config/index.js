import productionConfig from "./production";
import developmentConfig from "./development";
import sharedConfig from "./shared";
import { isProdEnv } from "../utils/helpers";

const config = isProdEnv() ? productionConfig : developmentConfig;

export default {
    ...sharedConfig,
    ...config
}