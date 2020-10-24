const models = require("../../models")
const { Op } = require("sequelize");

class UserService {
    static async position(userId) {
        return models.user.count({
            where: {
                id: {
                    [Op.lte]: userId
                }
            }
        })
    }
}

module.exports = UserService;