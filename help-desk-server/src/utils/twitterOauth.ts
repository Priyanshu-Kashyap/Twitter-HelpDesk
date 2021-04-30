import JsSHA from "jssha";

export class TwitterOauth {
    getAuthorization = (
        method: string | undefined,
        baseUrl: string,
        reqParams: {},
        accessToken: any,
        accessTokenSecret: any
    ) => {
        const consumerKey = process.env.TWITTER_CONSUMER_KEY;
        const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
        const twitterAccessToken = accessToken ? accessToken : "";
        const twitterAccessTokenSecret = accessTokenSecret ? accessTokenSecret : "";
        const timestamp = Math.round(Date.now() / 1000);
        const nonce = Buffer.from(consumerKey + ":" + timestamp).toString("base64");
        let baseString = this.oAuthBaseString(
            method,
            baseUrl,
            reqParams,
            consumerKey,
            twitterAccessToken,
            timestamp,
            nonce
        );
        let signingKey = this.oAuthSigningKey(
            consumerSecret,
            twitterAccessTokenSecret
        );
        let signature = this.oAuthSignature(baseString, signingKey);
        return (
            "OAuth " +
            'oauth_consumer_key="' +
            consumerKey +
            '", ' +
            'oauth_nonce="' +
            nonce +
            '", ' +
            'oauth_signature="' +
            signature +
            '", ' +
            'oauth_signature_method="HMAC-SHA1", ' +
            'oauth_timestamp="' +
            timestamp +
            '", ' +
            'oauth_token="' +
            twitterAccessToken +
            '", ' +
            'oauth_version="1.0"'
        );
    };

    private oAuthBaseString = (
        method: string | undefined,
        url: string,
        params: {},
        key: string | undefined,
        token: string,
        timestamp: number,
        nonce: string
    ) =>
        method +
        "&" +
        this.percentEncode(url) +
        "&" +
        this.percentEncode(
            this.genSortedParamStr(params, key, token, timestamp, nonce)
        );

    private oAuthSigningKey = (
        consumer_secret: string = "",
        token_secret: string
    ) => consumer_secret + "&" + token_secret;

    private oAuthSignature = (base_string: any, signing_key: any) => {
        const signature = this.hmac_sha1(base_string, signing_key);
        return this.percentEncode(signature);
    };

    private hmac_sha1 = (
        string: string | ArrayBuffer | Uint8Array,
        secret: string
    ) => {
        let shaObj = new JsSHA("SHA-1", "TEXT");
        shaObj.setHMACKey(secret, "TEXT");
        shaObj.update(string);
        return shaObj.getHMAC("B64");
    };

    private mergeObjs = (obj1: { [p: string]: any }, obj2: any) => {
        for (let attr in obj2) {
            obj1[attr] = obj2[attr];
        }
        return obj1;
    };

    private percentEncode = (str: string) =>
        encodeURIComponent(str).replace(/[!*()']/g, character => {
            return "%" + character.charCodeAt(0).toString(16);
        });

    private genSortedParamStr = (
        params: {},
        key: string | undefined,
        token: string,
        timestamp: number,
        nonce: string
    ) => {
        let paramObj = this.mergeObjs(
            {
                oauth_consumer_key: key,
                oauth_nonce: nonce,
                oauth_signature_method: "HMAC-SHA1",
                oauth_timestamp: timestamp,
                oauth_token: token,
                oauth_version: "1.0",
            },
            params
        );
        let paramObjKeys = Object.keys(paramObj);
        let len = paramObjKeys.length;
        paramObjKeys.sort();
        let paramStr = paramObjKeys[0] + "=" + paramObj[paramObjKeys[0]];
        for (let i = 1; i < len; i++) {
            paramStr +=
                "&" +
                paramObjKeys[i] +
                "=" +
                this.percentEncode(decodeURIComponent(paramObj[paramObjKeys[i]]));
        }
        return paramStr;
    };
}
