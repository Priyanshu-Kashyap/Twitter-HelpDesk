import cors from "cors";
import { config } from "dotenv";
import express, { Application, json, urlencoded } from "express";
import logger from "morgan";
import expressSession from "express-session";
import { initialize } from "passport";
import authRouter from "./routes/auth.route";
import { passportTwitter } from "./configs/passport.config";
import http, { createServer } from "http";
import { Server } from "socket.io";

class App {
  user: any;
  accessToken: any;
  refreshToken: any;
  private readonly _app: Application;
  private readonly _server: http.Server;
  private readonly _io: Server;

  constructor() {
    this._app = express();
    this._server = createServer(this._app);
    this._io = new Server(this._server, {
      cors: { origin: "*" },
    });
    this._app.set("port", process.env.PORT || 5000);
    this.configureMiddlewares();
  }

  get io(): Server {
    return this._io;
  }

  get app(): Application {
    return this._app;
  }

  configureMiddlewares() {
    config();
    this._app
      .use(cors())
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
      .use("/auth", authRouter);
    passportTwitter();
  }

  start() {
    this._server.listen(this._app.get("port"), () => {
      console.log(
        `🚀 server running on  http://localhost:${this._app.get("port")}`
      );
    });
  }
}

export const app = new App();
app.start();
