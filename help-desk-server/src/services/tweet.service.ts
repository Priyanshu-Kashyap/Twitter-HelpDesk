import {TwitterOauth} from "../utils/twitterOauth";
import axios, {Method} from "axios";

export class TweetService {
    private twitterOauth;

    constructor() {
        this.twitterOauth = new TwitterOauth();
    }

    requestTwitter = (
        method: string,
        url: string,
        req: any,
        reqParams = {},
        accessCredentials: { token: any; tokenSecret: any }
    ) => {
        const authHeaderValue = this.twitterOauth.getAuthorization(
            method?.toUpperCase(),
            url,
            reqParams,
            accessCredentials?.token,
            accessCredentials?.tokenSecret
        );
        return axios({
            method: method?.toLowerCase() as Method,
            headers: {
                Authorization: authHeaderValue,
            },
            params: reqParams,
        })
            .then(({data}) => ({success: true, data: data}))
            .catch(err => ({success: false, err}));
    };
}
