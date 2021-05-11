import { Dispatch, SetStateAction } from "react";
import { UserModel } from "../models/user.model";
import { MentionModel } from "../models/mention.model";

export type BooleanStateContext = [boolean, Dispatch<SetStateAction<boolean>>];

export type UserStateContext = [
  UserModel | null,
  Dispatch<SetStateAction<UserModel | null>>
];
export type MentionStateContext = [
  MentionModel[] | null,
  Dispatch<SetStateAction<MentionModel[] | null>>
];
