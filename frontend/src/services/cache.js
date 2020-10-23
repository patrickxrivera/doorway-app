import api from "./api";

const KEYS = {
    TOKEN: "TOKEN"
}

class Cache {
    static saveToken(token) {
        localStorage.setItem(KEYS.TOKEN, token);
        api.setToken(token);
    }

    static removeToken() {
        localStorage.removeItem(KEYS.TOKEN);
        api.removeToken();
    }
}

export default Cache;