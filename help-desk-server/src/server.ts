import { Server } from "@overnightjs/core";
import cors from "cors";
import { config } from "dotenv";
import { json, urlencoded } from "express";
import logger from "morgan";
import { AuthController } from "./controllers/auth.controller";
import { TweetsController } from "./controllers/tweets.controller";
import expressSession from 'express-session'
import { authenticate, deserializeUser, initialize, serializeUser, use } from 'passport'
import { Strategy } from "passport-twitter";

class AppServer {
  user: any
  accessToken: any;
  refreshToken: any;
  private _server: Server

  constructor() {
    this._server = new Server()
    config();
    this._server.app.set("port", process.env.PORT || 5000);
    this.configureMiddlewares();
    this.setupControllers();
  }

  configureMiddlewares() {
    this._server.app
        .use(cors({origin: "http://localhost:3000"}))
        .use(logger("dev"))
        .use(json())
        .use(urlencoded({extended: true}))
        .use(expressSession({secret: process.env.SESSION_SECRET as string, resave: true, saveUninitialized: true}))
        .use(initialize())
    serializeUser((user, done) => {
      done(null, user)
    })
    deserializeUser((id, done) => {
      done(null, null)
    })
    use(new Strategy({
          consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
          consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
          callbackURL: process.env.TWITTER_CALLBACK_URL as string
        }, (accessToken, refreshToken, profile, done) => {
          this.user = profile
          this.accessToken = accessToken
          this.refreshToken = refreshToken
          done(null, profile)
        }
        )
    )
    this._server.app.get('/auth/twitter', authenticate('twitter'))
        .get('/auth/twitter/callback',
            authenticate('twitter', {failureRedirect: '/'},),
            (req: any, res) => {
              req.session.user = this.user
              req.session.accessToken = this.accessToken
              req.session.refreshToken = this.refreshToken
              console.log(this.user)
              res.redirect('/tweets/mentions')
            })
  }


  setupControllers() {
    this._server.addControllers([new AuthController(), new TweetsController()]);
  }

  start() {
    this._server.app.listen(this._server.app.get("port"), () => {
      console.log(`🚀 server running on port ${ this._server.app.get("port") }`);
    });
  }
}

export const server = new AppServer();
