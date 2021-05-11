import { Router } from "express";
import { authenticate } from "passport";
import { app } from "../app";
import { userResponse } from "../utils/response";
import { socket } from "../utils/socket";

const authRouter = Router();

authRouter.get("/twitter", authenticate("twitter"));

authRouter.get(
  "/twitter/callback",
  authenticate("twitter", { failureRedirect: process.env.CLIENT_URL }),
  (req: any, res, next) => {
    req.session.user = app.user;
    req.session.accessToken = app.accessToken;
    req.session.refreshToken = app.refreshToken;
    res.redirect(process.env.CLIENT_URL as string);
  }
);

authRouter.delete("/logout", (req, res, next) => {
  req.session
    ? req.session.destroy((err) => {
        err
          ? res.status(400).send("Unable to log out")
          : res.send("Logout successful");
      })
    : res.end();
});

authRouter.get("/user", (req: any, res, next) => {
  res.send(userResponse(req.session.passport.user._json));
  socket(req.session.accessToken, req.session.refreshToken);
});

export default authRouter;
