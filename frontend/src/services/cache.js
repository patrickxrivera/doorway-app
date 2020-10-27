import api from "./api";

const KEYS = {
    TOKEN: "TOKEN",
    REFERRAL_CODE: "REFERRAL_CODE"
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

    static getToken() {
        return localStorage.getItem(KEYS.TOKEN);
    }

    static saveReferralCode(referralCode) {
        localStorage.setItem(KEYS.REFERRAL_CODE, referralCode);
    }

    static getReferralCode() {
        return localStorage.getItem(KEYS.REFERRAL_CODE);
    }

    static removeReferralCode() {
        localStorage.removeItem(KEYS.REFERRAL_CODE);
    }
}

export default Cache;