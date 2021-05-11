import { api } from "../api";
import { UserModel } from "../models/user.model";

export const getUser = async (): Promise<UserModel> =>
  (await api.get("/auth/user")).data;
export const logout = async () => (await api.delete("/auth/logout")).data;
