const Twitter = require("twitter-lite");
const { 
  callbackUrl: callbackUrlConfig, 
  twitterConsumerKey, 
  twitterConsumerSecret 
} = require("../../config");

const TWITTER_BASE_URL = "https://twitter.com";

class TwitterService {
  static async getRequestToken(options = {}) {
    const svc = new TwitterService(options);
    return svc.getRequestToken();
  }

  static async getAccessToken(data, options = {}) {
    const svc = new TwitterService(options);
    return svc.getAccessToken(data);
  }

  static async follow(data) {
    const svc = new TwitterService();
    return svc.follow(data);
  }

  constructor({ client = null, callbackUrl = null } = {}) {
      this.client = client ? new client() : new Twitter({
          consumer_key: twitterConsumerKey,
          consumer_secret: twitterConsumerSecret
      })

      this.callbackUrl = callbackUrl || callbackUrlConfig;
  }

  async getRequestToken() {
      return this.client.getRequestToken(this.callbackUrl);
  }

  async getAccessToken({ oAuthVerifier, oAuthToken}) {
    return this.client.getAccessToken({
      oauth_verifier: oAuthVerifier,
      oauth_token: oAuthToken
    });
  }

  async follow({ oAuthToken, oAuthTokenSecret }) {
    const client = new Twitter({
      consumer_key: twitterConsumerKey,
      consumer_secret: twitterConsumerSecret,
      access_token_key: oAuthToken,
      access_token_secret: oAuthTokenSecret
    })

    let response = [];

    const screenNames = ["patrickxrivera"];

    for (let screenName of screenNames) {
      const res = await client.post("friendships/create", {
        screen_name: screenName
      });

      response.push({
        screenName: `@${res.screen_name}`,
        profileLink: this._buildProfileLink(res.screen_name)
      })
    }

    return response;
  }

  _buildProfileLink(screenName) {
    return `${TWITTER_BASE_URL}/${screenName}`;
  }
}

module.exports = TwitterService;