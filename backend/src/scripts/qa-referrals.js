const ReferralCodeService = require("../services/referral-code");
const RedeemedReferralCodeService = require("../services/redeemed-referral-code");

const run = async () => {
    try {
        await RedeemedReferralCodeService.create({
            referreeId: 2,
            code: "2dbf437c-5831-4bd4-b193-6bc3a1a08f5f"
        });
    } catch (e) {
        console.log({e})
    }

    process.exit();
}

run();