import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: process.env.TWITTER_SERVER_BASE_URL,
});
