import { Router } from "express";
import { authenticate } from "passport";
import { server } from "../server";

const authRouter = Router();

authRouter.get("/twitter", authenticate("twitter"));

authRouter.get(
  "/twitter/callback",
  authenticate("twitter", { failureRedirect: "/" }),
  (req: any, res, next) => {
    req.session.user = server.user;
    req.session.accessToken = server.accessToken;
    req.session.refreshToken = server.refreshToken;

    res.redirect("/auth/user");
  }
);

authRouter.get("/user", (req: any, res, next) => res.send(req.session.user));

export default authRouter;
