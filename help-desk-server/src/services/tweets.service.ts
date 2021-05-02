import Twit from "twit"

export class TweetsService {
  twitterClient = (accessToken: any, refreshToken: any) => {
    return new Twit({
      consumer_key: process.env.TWITTER_CONSUMER_KEY as string,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string,
      access_token: accessToken,
      access_token_secret: refreshToken
    })
  }
}
