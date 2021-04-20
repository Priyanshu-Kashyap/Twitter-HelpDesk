import { Router } from "express";

export default class AuthController {
  private router = Router();
  hello = this.router.get("/", (req, res, next) => {
    res.send("hello");
  });
  getuser = this.router.get("/", (req, res, next) => {
    res.send("hello");
  });
}
