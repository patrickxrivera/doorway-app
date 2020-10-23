const TwitterService = require("../../src/services/twitter");
const {
    requestTokenResponse,
    accessTokenResponse,
    accessTokenArgs,
    callbackUrl
} = require("../fixtures/twitter.js");

class MockTwitterClient {}

describe("TwitterService", () => {
    let response;

    describe(".getRequestToken", () => {
        beforeAll(async () => {
            MockTwitterClient.prototype.getRequestToken = jest.fn((args) => {
                return requestTokenResponse;
            })

            response = await TwitterService.getRequestToken({ 
                client: MockTwitterClient,
                callbackUrl
            });
        });

        it("should return the right response", () => {
            expect(response).toStrictEqual(requestTokenResponse);
        })

        it("should be called with the right args", () => {
            expect(MockTwitterClient.prototype.getRequestToken).toHaveBeenCalledWith(callbackUrl);
        })
    })

    describe(".getAccessToken", () => {
        beforeAll(async () => {
            MockTwitterClient.prototype.getAccessToken = jest.fn((args) => {
                return accessTokenResponse;
            })

            const options = { client: MockTwitterClient }

            response = await TwitterService.getAccessToken(
                accessTokenArgs,
                options
            );
        });

        it("should return the right response", () => {
            expect(response).toStrictEqual(accessTokenResponse);
        })

        it("should be called with the right args", () => {
            expect(MockTwitterClient.prototype.getAccessToken).toHaveBeenCalledWith({
                oauth_token: accessTokenArgs.oAuthToken,
                oauth_verifier: accessTokenArgs.oAuthVerifier
            });
        })
    })
})