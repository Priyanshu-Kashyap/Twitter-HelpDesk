import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { FC } from "react";
import ChatView from "./ChatView";
import MessageBox from "./MessageBox";
import Topbar from "./Topbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      maxWidth: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      background: theme.palette.background.default,
    },
  })
);
const ChatSection: FC = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar />
      <ChatView />
      <MessageBox />
    </div>
  );
};

export default ChatSection;
