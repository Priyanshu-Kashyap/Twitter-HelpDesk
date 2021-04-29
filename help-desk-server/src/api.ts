import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: process.env.TWITTER_SERVER_BASE_URL,
});
export const setClientToken = () => {
  api.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers.Authorization = `OAuth oauth_consumer_key="${process.env.TWITTER_CONSUMER_KEY}",oauth_token="${process.env.TWITTER_ACCESS_TOKEN}",oauth_callback="${process.env.TWITTER_CALLBACK_URL}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1619474382",oauth_nonce="MhTn1hQvEfV",oauth_version="1.0",oauth_signature="Q6FS45q8xnwkp7N6YdFgAWHgCXk%3D"`;
    return config;
  });
};
