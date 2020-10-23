import axios from "axios";
import config from "../config";

class APIClient {
    constructor() {
       axios.defaults.baseURL = config.apiUrl;
       this.client = axios;
    }

    async get(path) {
        return this.client.get(path);
    }

    async post(path, data) {
        return this.client.post(path, data);
    }

    setToken(token) {
        this.client.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    }

    removeToken() {
        this.client.defaults.headers.common = {}
    }
}

export default new APIClient();