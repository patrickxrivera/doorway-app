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

  static async follow(accessTokens) {
    const svc = new TwitterService();
    return svc.follow(accessTokens);
  }

  static async validateScreenNames(screenNames, accessTokens) {
    const svc = new TwitterService();
    return svc.validateScreenNames(screenNames, accessTokens);
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

  async follow(accessTokens) {
    const client = this._initClientWithAccessTokens(accessTokens)

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

  async validateScreenNames(screenNames, accessTokens) {
    // cases
    // 1) all screen names valid
    // 2) some valid, some invalid
    // 3) all invalid
    const client = this._initClientWithAccessTokens(accessTokens);

    let users = []

    try {
      users = await client.post("users/lookup", {
        screen_name: screenNames
      });
    } catch (e) {
      // no user matches specified terms
      return {
        validScreenNames: [],
        invalidScreenNames: screenNames.split(",")
      }
    }

    const validScreenNames = users.map(({ screen_name }) => screen_name);

    const lowercasedValidScreenNames = validScreenNames.map(s => s.toLowerCase());

    let invalidScreenNames = [];
    
    screenNames.split(",").forEach((screenName) => {
      if (!lowercasedValidScreenNames.includes(screenName.trim())) {
        invalidScreenNames.push(screenName);
      }
    })

    return {
      validScreenNames,
      invalidScreenNames
    }
  }

  _buildProfileLink(screenName) {
    return `${TWITTER_BASE_URL}/${screenName}`;
  }

  _initClientWithAccessTokens({ oAuthToken, oAuthTokenSecret }) {
    return new Twitter({
      consumer_key: twitterConsumerKey,
      consumer_secret: twitterConsumerSecret,
      access_token_key: oAuthToken,
      access_token_secret: oAuthTokenSecret
    })
  }
}

module.exports = TwitterService;