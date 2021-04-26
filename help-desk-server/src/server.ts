import { Server } from "@overnightjs/core";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import session from "express-session";
import logger from "morgan";
import {
  authenticate,
  deserializeUser,
  initialize,
  serializeUser,
  use,
} from "passport";
import { Strategy } from "passport-twitter";
import { AuthController } from "./controllers/auth.controller";
import { TweetsController } from "./controllers/tweets.controller";

class AppServer {
  constructor(private _server: Server) {
    this._server.app.set("port", process.env.PORT || 5000);
    this.configureMiddlewares();
    this.setupControllers();
  }
  configureMiddlewares() {
    config();
    this._server.app
      .use(cors({ origin: "http://localhost:3000" }))
      .use(logger("dev"))
      .use(json())
      .use(urlencoded({ extended: false }))
      .use(initialize())
      .use(session({ secret: "shfj", resave: true, saveUninitialized: true }));
    serializeUser(function (user, done) {
      done(null, user);
    });
    deserializeUser(function (id, done) {
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
          done(null, profile);
        }
      )
    );
    this._server.app.get("/auth/twitter", authenticate("twitter"));
    this._server.app.get(
      "/auth/twitter/callback",
      authenticate("twitter", {
        failureRedirect: "/auth",
        successRedirect: "/auth/user",
      })
    );
  }
  setupControllers() {
    this._server.addControllers([new AuthController(), new TweetsController()]);
  }
  start() {
    this._server.app.listen(this._server.app.get("port"), () => {
      console.log(`🚀 server running on port ${this._server.app.get("port")}`);
    });
  }
}
export const server = new AppServer(new Server());
