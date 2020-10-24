import { GET_REFERRAL_CODE } from "../utils/endpoints";
import { getErrorMessageFromResponse } from "../utils/helpers";
import * as Sentry from "@sentry/react";
import api from "../services/api";

export const getReferralCode = async () => {
    try {
        const res = await api.post(GET_REFERRAL_CODE);
        
        const { referralCode } = res.data;
        
        return referralCode;
    } catch (e) {
        Sentry.captureMessage(getErrorMessageFromResponse(e));
        return null;
    }
}