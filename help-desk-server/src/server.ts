import { Server } from "@overnightjs/core";
import cors from "cors";
import { config } from "dotenv";
import { json, urlencoded } from "express";
import session from "express-session";
import logger from "morgan";
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
      .use(urlencoded({ extended: true }))
      .use(session({ secret: "shfj", resave: true, saveUninitialized: true }));
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
