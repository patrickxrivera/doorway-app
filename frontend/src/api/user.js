import { GET_POSITION } from "../utils/endpoints";
import { getErrorMessageFromResponse } from "../utils/helpers";
import * as Sentry from "@sentry/react";
import api from "../services/api";

export const getPosition = async () => {
    try {
        const res = await api.get(GET_POSITION);
        
        const { position, odds } = res.data;
        
        return { position, odds };
    } catch (e) {
        Sentry.captureMessage(getErrorMessageFromResponse(e));
        return null;
    }
}