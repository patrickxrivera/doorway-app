const models = require("../../models");
const { INTERNET_IDENTITY_TYPES } = require("../../utils/constants");

class Leaderboard {
    static async fetch({ limit = null } = {}) {
        const query = `
            select 
                ii."screenName",
                u.id,
                sum(et.points) as points
            from 
                public."events" e join 
                public."eventTypes" et on e."eventTypeId" = et.id 
                join public."internetIdentities" ii on ii."userId" = e."userId" 
                join public."users" u on ii."userId" = u.id
            where 
                ii."identityType" = :twitterIdentityType
            and
                ii."revokedAt" is null
            group by 
                1, 2
            order by 
                3 desc, 2 asc
            limit
                :limit;
        `

        const [leaderboard] = await models.sequelize.query(query, {
            replacements: { 
                twitterIdentityType: INTERNET_IDENTITY_TYPES.TWITTER,
                limit
            },
        });
        
        return leaderboard;
    }
}

module.exports = Leaderboard;