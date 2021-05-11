import React, { FC, useContext } from "react";
import {
  Avatar,
  Card,
  makeStyles,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import { NavLink } from "react-router-dom";
import { MentionModel } from "../../../models/mention.model";
import { UserContext } from "../../../contexts/user.context";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.default,
      width: "100%",
      height: "5rem",
      overflow: "none",
      padding: theme.spacing(1, 2),
      display: "flex",
      alignItems: "center",
      "&:hover": {
        background: theme.palette.secondary.main,
      },
    },
    chat: {
      flexDirection: "column",
      alignItems: "flex-start",
      marginLeft: "1rem",
    },
  })
);

const Chats: FC<{ chat: MentionModel }> = ({ chat }) => {
  const classes = useStyles(chat);
  const theme = useTheme();
  const [user] = useContext(UserContext);
  let message = chat.replies.length
    ? chat.replies[chat.replies.length - 1]?.text
    : chat.text;
  message = message
    .replace(`@${user?.screen_name}`, "")
    .replace(`@${user?.screen_name.toLowerCase()}`, "")
    .replace(`@${chat.user?.screen_name}`, "")
    .replace(`@${chat.user?.screen_name.toLowerCase()}`, "");
  return (
    <Card elevation={0} variant={"outlined"} style={{ borderRadius: "0" }}>
      <NavLink
        className={classes.root}
        activeStyle={{
          background: theme.palette.secondary.main,
          borderRight: `5px solid ${theme.palette.primary.main}`,
        }}
        to={chat.id_str}
      >
        <Avatar src={chat.user.profile_image_url_https} />
        <div className={classes.chat}>
          <Typography color={"textPrimary"} variant={"subtitle1"}>
            {chat.user.name}
          </Typography>
          <Typography color={"textSecondary"} variant={"subtitle2"}>
            {chat.user.screen_name === user?.screen_name
              ? `You: ${message}`
              : message}
          </Typography>
        </div>
        <Typography
          color={"textSecondary"}
          variant={"caption"}
          style={{ position: "absolute", right: "1rem", top: "1rem" }}
        >
          {chat.replies.length
            ? moment(
                new Date(chat.replies[chat.replies.length - 1].created_at)
              ).fromNow()
            : moment(new Date(chat.created_at)).fromNow()}
        </Typography>
      </NavLink>
    </Card>
  );
};

export default Chats;
