import { AuthController } from "./controllers/authController";
import TweetsController from "./controllers/tweetsController";
import createError from "http-errors";
import { server } from "./server";
new AuthController();
new TweetsController();
server.app.use((req, res, next) => {
  next(createError(404));
});
server.start();
