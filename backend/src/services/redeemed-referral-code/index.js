const models = require("../../models");
const EventService = require("../event");

class RedeemedReferralCodeService {
    static async create({ code, referreeId }) {
        let referralCodeId, referrerId;

        try {
            // TODO: add an index on the "code" column
            const { id, userId } = await models.referralCode.findOne({
                where: { 
                    code,
                    revokedAt: null
                }
            });

            referralCodeId = id;
            referrerId = userId;
        } catch (e) {
            throw new Error("Referral code doesn't exist");
        }

        if (referreeId === referrerId) {
            throw new Error("Can't refer yourself. You're clever though! ;)")
        }

        const existingRedeemedReferralCode = await models.redeemedReferralCode.findOne({
            where: {
                referralCodeId,
                referreeId,
                referrerId    
            }
        })

        if (existingRedeemedReferralCode) {
            throw new Error("Can only redeem a referral code once. Sowwy.");
        }

        const redeemedReferralCode = await models.redeemedReferralCode.create({
            referralCodeId,
            referreeId,
            referrerId
        })

        await EventService.logReferrer(referrerId);
        
        await EventService.logReferree(referreeId);

        return redeemedReferralCode;
    }
}

module.exports = RedeemedReferralCodeService;