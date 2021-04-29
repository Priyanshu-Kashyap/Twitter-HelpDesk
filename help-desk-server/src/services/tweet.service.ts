import { api, setClientToken } from "../api";

export class TweetService {
  constructor() {
    setClientToken();
  }
  async mentionedTweets(id: string = "1119550687002497024") {
    return (await api.get(`/2/users/${id}/mentions`)).data;
  }
  async retweet(id: string, body: any) {
    return (await api.post(`/1.1/statuses/retweet/${id}`, body)).data;
  }
  tweeter() {}
}
