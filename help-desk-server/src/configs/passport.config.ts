import { deserializeUser, serializeUser, use } from "passport";
import { Strategy } from "passport-twitter";
import { server } from "../server";

export const passportTwitter = () => {
  serializeUser((user, done) => {
    done(null, user);
  });
  deserializeUser((id, done) => {
    done(null, null);
  });
  use(
    new Strategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
        callbackURL: process.env.TWITTER_CALLBACK_URL as string,
      },
      (accessToken, refreshToken, profile, done) => {
        server.user = profile;
        server.accessToken = accessToken;
        server.refreshToken = refreshToken;
        done(null, profile);
      }
    )
  );
};
