import { Socket } from "socket.io";
import { TweetService } from "../services/tweet.service";
import { app } from "../app";
import { mentionResponse } from "./response";

export const socket = (accessToken: string, refreshToken: string) =>
  app.io.on("connection", async (socket: Socket) => {
    const tweetService = new TweetService(accessToken, refreshToken);
    socket.on("login", async (data: any) => {
      socket.join(data.user);
      app.io.emit(
        "mention",
        mentionResponse(await tweetService.fetchMentions())
      );
      tweetService.streamTweets(data.user);
      socket.on("reply", async (data) => {
        console.log(data);
        await tweetService.replyTweets(
          `@${data.user} ${data.msg.message}`,
          data.msg.id
        );
        app.io.emit(
          "mention",
          mentionResponse(await tweetService.fetchMentions())
        );
      });
    });
  });
