import {
  createStyles,
  ListItem,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import React, { FC, useContext } from "react";
import { MentionContext } from "../../../contexts/mention.context";
import Chats from "./Chats";

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

const ChatsOverview: FC = (props) => {
  const classes = useStyles();
  const [mention] = useContext(MentionContext);

  const chats = mention?.map((chat) => (
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
