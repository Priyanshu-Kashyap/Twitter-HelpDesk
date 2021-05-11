import { UserModel } from "../models/user.model";
import { MentionModel } from "../models/mention.model";

export const userResponse = ({
  id_str,
  name,
  screen_name,
  location,
  profile_image_url_https,
}: UserModel): UserModel => ({
  id_str,
  name,
  screen_name,
  location,
  profile_image_url_https,
});

export const mentionResponse = (mentions: any): MentionModel[] =>
  mentions.map(
    ({
      id_str,
      in_reply_to_status_id_str,
      replies,
      entities,
      user,
      text,
      created_at,
    }: MentionModel) => ({
      id_str,
      in_reply_to_status_id_str,
      created_at,
      text,
      replies: mentionResponse(replies),
      entities,
      user: userResponse(user),
    })
  );
