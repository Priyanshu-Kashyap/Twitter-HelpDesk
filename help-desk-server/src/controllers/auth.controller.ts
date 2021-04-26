import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
  @Get("user")
  user(req: any, res: Response) {
    res.send(req.session.passport.user);
  }
  @Get("logout")
  logout(req: Request, res: Response) {
    req.session.destroy(() => res.redirect("/"));
  }
}
