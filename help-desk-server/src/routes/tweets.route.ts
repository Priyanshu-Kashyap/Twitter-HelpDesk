import { Router } from "express";
import { twitterClient } from "../configs/twit.config";

const tweetsRouter = Router();
tweetsRouter.get("/mentions", (req: any, res, next) => {
  twitterClient(req.session.accessToken, req.session.refreshToken).get(
    "statuses/mentions_timeline",
    (err: any, data: any) => {
      res.send(data);
    }
  );
});

tweetsRouter.post("/reply/:id", (req: any, res, next) => {
  twitterClient(req.session.accessToken, req.session.refreshToken).post(
    "statuses/update",
    {
      status: req.body.message,
      in_reply_to_status_id: req.params.id,
    },
    (err: any, data: any) => {
      res.send(data);
    }
  );
});

export default tweetsRouter;
