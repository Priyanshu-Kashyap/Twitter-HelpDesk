import { Request, Response } from "express";
import { Get } from "../routes";

export class AuthController {
  @Get("/hello")
  public hello(req: Request, res: Response) {
    res.send("hello");
  }
}
