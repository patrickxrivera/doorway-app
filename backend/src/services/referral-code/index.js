const models = require("../../models");
const { v4: uuidv4 } = require('uuid');

class ReferralCodeService {
    static async create(userId) {
        const code = uuidv4();

        return models.referralCode.create({
            userId,
            code
        })
    }
}

module.exports = ReferralCodeService;