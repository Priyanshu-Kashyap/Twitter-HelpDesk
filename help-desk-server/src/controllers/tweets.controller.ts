import { Controller, Get } from "@overnightjs/core";
import { Response } from "express";
import { TweetService } from "../services/tweet.service";

@Controller("tweets")
export class TweetsController {
  private TweetService: TweetService;
  constructor() {
    this.TweetService = new TweetService();
  }
  @Get("mentions")
  mentions(req: any, res: Response) {
    this.TweetService.mentionedTweets().then(data => console.log(data));
  }
}
