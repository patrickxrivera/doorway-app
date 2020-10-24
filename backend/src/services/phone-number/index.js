const models = require("../../models")

class PhoneNumberService {
    static async create(number) {
        return models.phoneNumber.create({
            number
        })
    }
}

module.exports = PhoneNumberService;