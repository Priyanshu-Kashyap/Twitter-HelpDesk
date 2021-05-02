import { Controller, Get } from "@overnightjs/core";
import { Response } from "express";
import { server } from "../server";

@Controller("auth")
export class AuthController {

  @Get('user')
  getUser(req: any, res: Response) {
    res.send(req.session.user)

  }

}
