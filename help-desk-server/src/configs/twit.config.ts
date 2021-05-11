import Twit from "twit";

export const twitterClient = (accessToken: string, refreshToken: string) =>
  new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY as string,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string,
    access_token: accessToken,
    access_token_secret: refreshToken,
  });
