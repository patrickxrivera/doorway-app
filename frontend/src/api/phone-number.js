import { SAVE_PHONE_NUMBER } from "../utils/endpoints";
import { getErrorMessageFromResponse } from "../utils/helpers";
import * as Sentry from "@sentry/react";
import api from "../services/api";

export const savePhoneNumber = async (number) => {
    try {
        const response = await api.post(SAVE_PHONE_NUMBER, { number: `+${number}` });
        return response.data.success;
    } catch (e) {
        Sentry.captureMessage(getErrorMessageFromResponse(e));
        return null;
    }
}