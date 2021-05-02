import { Controller, Get, Post } from "@overnightjs/core";
import { Response } from "express";
import { TweetsService } from "../services/tweets.service";

@Controller("tweets")
export class TweetsController {
  private tweetService: TweetsService;

  constructor() {
    this.tweetService = new TweetsService()
  }


  @Get("mentions")
  mentions(req: any, res: Response) {
    this.tweetService.twitterClient(req.session.accessToken, req.session.refreshToken)
        .get('statuses/mentions_timeline', (err: any, data: any) => {
          res.send(data)
        })
  }

  @Post('reply/:id')
  reply(req: any, res: Response) {
    console.log(req.body, req.params.id)
    this.tweetService.twitterClient(req.session.accessToken, req.session.refreshToken)
        .post('statuses/update', {
          status: req.body.text,
          in_reply_to_status_id: req.params.id,
        }, (err: any, data: any) => {
          res.send(data)
        })
  }
}
