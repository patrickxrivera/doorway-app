import axios from "axios";
import config from "../config";
import Cache from "./cache";

class APIClient {
    constructor() {
       axios.defaults.baseURL = config.apiUrl;
       this.client = axios;
    }

    async get(path) {
        return this.client.get(path, this._config());
    }

    async post(path, data) {
        return this.client.post(path, data, this._config());
    }

    _config() {
        const token = Cache.getToken();

        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }

    setToken(token) {
        this.client.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    }

    removeToken() {
        this.client.defaults.headers.common = {}
    }
}

export default new APIClient();