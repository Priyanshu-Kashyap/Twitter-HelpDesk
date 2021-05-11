import {
  createStyles,
  List,
  ListItem,
  ListSubheader,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { FC, Fragment, useContext, useEffect, useRef } from "react";
import { MentionModel } from "../../../models/mention.model";
import { UserContext } from "../../../contexts/user.context";
import Conversation from "./Conversation";
import moment from "moment";
import { MentionContext } from "../../../contexts/mention.context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      width: "100%",
      display: "flex",
      height: "100vh",
      flexDirection: "column",
      padding: theme.spacing(1, 2),
      background: theme.palette.background.default,
      overflow: "scroll",
    },
    chat: {
      margin: "0.25rem",
      borderRadius: "1rem 1rem 1rem 0",
      background: theme.palette.secondary.main,
      width: "auto",
      alignSelf: "flex-start",
    },
  })
);
const ChatView: FC<{ chat: MentionModel }> = ({ chat }) => {
  const classes = useStyles();
  const [user] = useContext(UserContext);
  const [mention] = useContext(MentionContext);
  const scrollRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [mention]);

  const groupBy = (arr: any, property: any) =>
    arr.reduce((acc: any, obj: any) => {
      let key = obj[property];
      key = new Date(key).toLocaleDateString();
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});

  const replies = groupBy(chat.replies, "created_at");

  const repliesArr = Object.keys(replies)
    .map((date) => ({
      date,
      chats: replies[date].sort(
        (a: any, b: any) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      ),
    }))
    .reverse();
  const userReplies = repliesArr.map((arr: any, index) => (
    <Fragment key={index}>
      <ListSubheader
        style={{
          borderRadius: "0.5rem",
          alignSelf: "center",
          display:
            arr.date === new Date(chat.created_at).toLocaleDateString()
              ? "none"
              : "block",
        }}
      >
        {arr.date}
      </ListSubheader>
      {arr.chats.map((item: MentionModel) => (
        <Conversation
          key={item.id_str}
          chat={item}
          username={user?.screen_name}
          name={chat.user.screen_name}
        />
      ))}
    </Fragment>
  ));
  return (
    <List className={classes.root}>
      <ListSubheader
        style={{
          borderRadius: "0.5rem",
          alignSelf: "center",
        }}
      >
        {new Date().toLocaleDateString() ===
        new Date(chat.created_at).toLocaleDateString()
          ? "Today"
          : new Date(chat.created_at).toLocaleDateString()}
      </ListSubheader>
      <ListItem className={classes.chat}>
        {chat.text
          .replace(`@${user?.screen_name.toLowerCase()}`, "")
          .replace(`@${user?.screen_name}`, "")}
      </ListItem>
      <Typography variant={"caption"}>
        {moment(new Date(chat.created_at)).format("LT")}
      </Typography>
      {userReplies}
      <span ref={scrollRef} />
    </List>
  );
};

export default ChatView;
