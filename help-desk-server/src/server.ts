import cors from "cors";
import { config } from "dotenv";
import express, { Express, json, urlencoded } from "express";
import logger from "morgan";
import expressSession from "express-session";
import { initialize } from "passport";
import authRouter from "./routes/auth.route";
import tweetsRouter from "./routes/tweets.route";
import { passportTwitter } from "./configs/passport.config";

class AppServer {
  user: any;
  accessToken: any;
  refreshToken: any;
  private _app: Express;

  constructor() {
    this._app = express();
    this._app.set("port", process.env.PORT || 5000);
    this.configureMiddlewares();
  }

  configureMiddlewares() {
    config();
    this._app
      .use(cors({ origin: "http://localhost:3000" }))
      .use(logger("dev"))
      .use(json())
      .use(urlencoded({ extended: true }))
      .use(
        expressSession({
          secret: process.env.SESSION_SECRET as string,
          resave: true,
          saveUninitialized: true,
        })
      )
      .use(initialize())
      .use("/auth", authRouter)
      .use("/tweets", tweetsRouter);
    passportTwitter();
  }

  start() {
    this._app.listen(this._app.get("port"), () => {
      console.log(`🚀 server running on port ${this._app.get("port")}`);
    });
  }
}

export const server = new AppServer();
