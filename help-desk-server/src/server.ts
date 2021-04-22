import cors from "cors";
import { config } from "dotenv";
import express, { Express } from "express";
import http from "http";
import logger from "morgan";
import passport from "passport";
import { Profile, Strategy } from "passport-twitter";
import { AuthController } from "./controllers/authController";

class Server {
  private readonly _app: Express;
  private _server!: http.Server;
  constructor() {
    this._app = express();
    this._app.set("port", process.env.PORT || 5000);
    this.configureMiddleware();
  }
  get app(): Express {
    return this._app;
  }
  get server(): http.Server {
    return this._server;
  }
  public configureMiddleware() {
    config({ path: "../.env" });
    this.app.use(cors({ origin: "http//:localhost:3000" }));
    this.app.use(logger("dev"));
    this.app.use(passport.initialize());
    this.app.use(
      (err: { message: any; status: any }, req: any, res: any, next: any) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render("error");
      }
    );

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
        (
          accessToken: string,
          refreshToken: string,
          profile: Profile,
          done: any
        ) => {
          console.log(profile);
          done(null, profile);
        }
      )
    );
  }
  public start() {
    this._server = this._app.listen(this._app.get("port"), () => {
      console.log("Server is running on port " + this._app.get("port"));
    });
  }
}

export const server = new Server();
