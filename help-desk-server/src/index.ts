import { config } from "dotenv";
import express from "express";
import createError from "http-errors";
import logger from "morgan";
import passport from "passport";
import { Profile, Strategy } from "passport-twitter";
import AuthController from "./controllers/authController";

const app = express();
const auth = new AuthController();
config({ path: "../.env" });
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});
passport.use(
  new Strategy(
    {
      consumerKey: `${process.env.TWITTER_API_KEY}`,
      consumerSecret: `${process.env.TWITTER_API_SECRET_KEY}`,
      callbackURL: `${process.env.TWITTER_CALLBACK_URL}`,
    },
    (accessToken: string, refreshToken: string, profile: Profile, done: any) =>
      done(null, profile)
  )
);
app.use(logger("dev"));
app.use("/", auth.hello);
app.use((req, res, next) => {
  next(createError(404));
});
app.use((err: { message: any; status: any }, req: any, res: any, next: any) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.listen("5000", () => {
  console.log("server running!");
});
