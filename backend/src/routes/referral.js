const ReferralCodeService = require("../services/referral-code");
const RedeemedReferralCodeService = require("../services/redeemed-referral-code");

const setupReferralRoutes = (server, { auth }) => {
    server.post("/referral/code", auth, async (req, res, next) => {
        try {
            const { userId } = req;
            
            const { code: referralCode } = await ReferralCodeService.create(userId);
            
            res.json({ referralCode });
        } catch (e) {
            next(e);
        }
    });

    server.get("/referral/code", auth, async (req, res, next) => {
        try {
            const { userId } = req;
            
            const { code: referralCode } = await ReferralCodeService.upsert(userId);
            
            res.json({ referralCode });
        } catch (e) {
            next(e);
        }
    });

    server.post("/referral/redeem", auth, async (req, res, next) => {
        try {
            const { userId } = req;
            const { referralCode: code } = req.body;

            const { id } = await RedeemedReferralCodeService.create({
                referreeId: userId,
                code
            });

            res.json({ id });
        } catch (e) {
            next(e);
        }
    });
}

module.exports = {
    setupReferralRoutes
}