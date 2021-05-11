import { uniqBy } from "lodash";
import { twitterClient } from "../configs/twit.config";
import { app } from "../app";
import { mentionResponse } from "../utils/response";

export class TweetService {
  constructor(private accessToken: string, private refreshToken: string) {}

  fetchMentions = async () => {
    let mentions: any = (
      await twitterClient(this.accessToken, this.refreshToken).get(
        "statuses/mentions_timeline"
      )
    ).data;
    mentions = mentions.filter((item: any) => !item.in_reply_to_status_id_str);
    if (mentions.length === 0) return [];
    const tempReplies = mentions.filter(
      (item: any) => item.in_reply_to_status_id_str
    );
    const currentUsername = mentions[0].entities.user_mentions[0].screen_name;
    let repliesArr = await Promise.all<any>(
      mentions.map(
        async (item: any) =>
          (await this.searchTweets(item.user.screen_name)).data.statuses
      )
    );
    const currentReplies = (await this.searchTweets(currentUsername)).data
      .statuses;
    const replies = [...tempReplies, ...(currentReplies || [])];
    repliesArr?.map((arr) => arr?.map((item: any) => replies.push(item)));
    const updatedData = mentions.map((item: any) => {
      let updatedItem = this.updateReplies(item, replies);
      updatedItem.replies = uniqBy(updatedItem.replies, "id");
      return updatedItem;
    });
    return this.sortData(updatedData, "created_at");
  };
  replyTweets = async (msg: any, id: string | number) =>
    await twitterClient(this.accessToken, this.refreshToken).post(
      "statuses/update",
      {
        status: msg,
        in_reply_to_status_id: id,
      }
    );

  streamTweets = (username: string) => {
    twitterClient(this.accessToken, this.refreshToken)
      .stream("statuses/filter", {
        track: [`@${username}`, `@${username.toLowerCase()}`],
      })
      .on("message", async () => {
        app.io.emit("mention", mentionResponse(await this.fetchMentions()));
      });
  };

  private updateReplies = (tweet: any, replies: any) => {
    const tweetId = tweet.id_str;
    const leftReplies: any[] = [];
    const userReplies = replies?.filter((reply: any) => {
      if (reply?.in_reply_to_status_id_str === tweetId) return reply;
      leftReplies.push(reply);
    });
    tweet.replies = userReplies || [];
    if (leftReplies.length)
      userReplies.map((ur: any) => this.updateReplies(ur, leftReplies));
    return tweet;
  };

  private searchTweets = (username: string): any =>
    twitterClient(this.accessToken, this.refreshToken).get("search/tweets", {
      q: username,
    });

  private sortData = (unsortedData: any, sortKey: any) =>
    unsortedData.sort(
      (a: any, b: any) =>
        new Date(b[sortKey]).getTime() - new Date(a[sortKey]).getTime()
    );
}
