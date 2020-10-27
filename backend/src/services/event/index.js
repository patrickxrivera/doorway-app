const models = require("../../models");
const { EVENT_TYPES } = require("../../utils/constants");
const Sentry = require("../sentry");

class EventService {
    static async logSignUp(userId) {
        return EventService.logEvent({
            userId,
            type: EVENT_TYPES.SIGN_UP.name
        })
    }

    static async logReferrer(userId) {
        return EventService.logEvent({
            userId,
            type: EVENT_TYPES.REFERRER.name
        })
    }

    static async logReferree(userId) {
        return EventService.logEvent({
            userId,
            type: EVENT_TYPES.REFERREE.name
        })
    }

    static async logEvent({ userId, type }) {
        const eventTypeRecord = await models.eventType.findOne({
            where: { type }
        });

        if (!eventTypeRecord) {
            Sentry.captureMessage(`Event does not exist ${type}`);
            return null;
        }

        return models.event.create({
            userId,
            eventTypeId: eventTypeRecord.id
        })
    }

    static async totalPoints() {
        const query = `
            select 
                sum(et.points)
            from 
                public."events" e join 
                public."eventTypes" et on e."eventTypeId" = et.id
                join public."internetIdentities" ii on ii."userId" = e."userId"
            where
                ii."revokedAt" is null;
        `

        const [[{sum}]] = await models.sequelize.query(query);
        
        return sum;
    }

    static async pointsByUserId(userId) {
        const query = `
            select 
                sum(et.points) 
            from 
                public."events" e join 
                public."eventTypes" et on e."eventTypeId" = et.id
            where
                e."userId" = :userId;
        `

        const [[{sum}]] = await models.sequelize.query(query, {
            replacements: { userId },
        });
        
        return sum;
    }
}

module.exports = EventService;