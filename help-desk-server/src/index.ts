import { AuthController } from "./controllers/authController";
import TweetsController from "./controllers/tweetsController";
import { server } from "./server";
new AuthController();
new TweetsController();

server.start();
