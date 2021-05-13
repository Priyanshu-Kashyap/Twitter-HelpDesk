import {
  createStyles,
  ListItem,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import React, { FC } from "react";
import Chats from "./Chats";
import { MentionModel } from "../../../models/mention.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      height: "100%",
      borderRadius: "0",
      flexDirection: "column",
      overflow: "scroll",
    },
  })
);

const ChatsOverview: FC<{ filteredMentions: MentionModel[] | null }> = ({
  filteredMentions,
}) => {
  const classes = useStyles();

  const chats = filteredMentions?.map((chat) => (
    <ListItem key={chat.id_str} itemID={chat.id_str} style={{ padding: 0 }}>
      <Chats chat={chat} />
    </ListItem>
  ));

  return (
    <Paper variant="outlined" className={classes.root}>
      {chats}
    </Paper>
  );
};

export default ChatsOverview;
