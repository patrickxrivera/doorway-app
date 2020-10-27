const models = require("../../models");
const referralCodeGenerator = require('referral-code-generator')

class ReferralCodeService {
    static async create(userId) {
        const code = referralCodeGenerator.alpha('lowercase', 12);

        return models.referralCode.create({
            userId,
            code
        })
    }

    static async upsert(userId) {
        const existingReferralCode = await models.referralCode.findOne({
            where: { userId }
        });

        if (existingReferralCode) {
            return existingReferralCode;
        }

        return ReferralCodeService.create(userId);
    }
}

module.exports = ReferralCodeService;