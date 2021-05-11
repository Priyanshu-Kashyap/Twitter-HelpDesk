import { UserModel } from "./user.model";

export interface MentionModel {
  id_str: string;
  in_reply_to_status_id_str: string | null;
  created_at: Date;
  text: string;
  user: UserModel;
  entities: any;
  replies: MentionModel[] | [];
}
