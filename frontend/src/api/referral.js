import { GET_REFERRAL_CODE, REDEEM_REFERRAL_CODE } from "../utils/endpoints";
import { getErrorMessageFromResponse } from "../utils/helpers";
import * as Sentry from "@sentry/react";
import api from "../services/api";

export const getReferralCode = async () => {
    try {
        const res = await api.get(GET_REFERRAL_CODE);
        
        const { referralCode } = res.data;
        
        return referralCode;
    } catch (e) {
        Sentry.captureMessage(getErrorMessageFromResponse(e));
        return null;
    }
}

export const redeemReferralCode = async (referralCode) => {
    try {
        await api.post(REDEEM_REFERRAL_CODE, {
            referralCode
        });
        return true;
    } catch (e) {
        Sentry.captureMessage(getErrorMessageFromResponse(e));
        return null;
    }
}

