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
}

module.exports = ReferralCodeService;