import React, { FC } from "react";
import { ListItem, makeStyles } from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import { MentionModel } from "../../../models/mention.model";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: ({ chat, name }: any) => ({
      paddingBottom: "0.5rem",
      width: "auto",
      borderRadius:
        chat.user.screen_name !== name
          ? "1rem 1rem 0 1rem"
          : "1rem 1rem 1rem 0",
      margin: "0.25rem 0",
      alignSelf: chat.user.screen_name !== name ? "flex-end" : "flex-start",
      color:
        chat.user.screen_name === name ? theme.palette.text.primary : "white",
      background:
        chat.user.screen_name !== name
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
    }),
  })
);
const Conversation: FC<{
  chat: MentionModel;
  username: string | undefined;
  name: string;
}> = ({ chat, username, name }) => {
  const classes = useStyles({ chat, name });
  return (
    <ListItem className={classes.root}>
      {chat.text.replace(`@${username}`, "").replace(`@${name}`, "")}
    </ListItem>
  );
};

export default Conversation;
