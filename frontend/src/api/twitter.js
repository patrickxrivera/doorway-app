import { GET_REQUEST_TOKEN, GET_ACCESS_TOKEN, FOLLOW_ON_TWITTER } from "../utils/endpoints";
import { getErrorMessageFromResponse } from "../utils/helpers";
import * as Sentry from "@sentry/react";
import api from "../services/api";

export const getRequestToken = async () => {
    try {
        const requestToken = await api.get(GET_REQUEST_TOKEN);
        
        const { oauth_token } = requestToken.data;
        
        return oauth_token;
    } catch (e) {
        Sentry.captureMessage(getErrorMessageFromResponse(e));
        return null;
    }
}

export const getAccessToken = async ({ oAuthToken, oAuthVerifier }) => {
    const accessToken = await api.post(GET_ACCESS_TOKEN, {
        oAuthToken,
        oAuthVerifier
    });

    return accessToken.data;
}

export const followOnTwitter = async () => {
    const res = await api.post(FOLLOW_ON_TWITTER);
    return res.data;
}