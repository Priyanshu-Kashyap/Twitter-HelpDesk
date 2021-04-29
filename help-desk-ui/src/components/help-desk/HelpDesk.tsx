import { makeStyles, Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import React, { FC, useState } from "react";
import { ChatInfoContext } from "../../App.contexts";
import ChatsInfo from "./chat-section/ChatInfo";
import ChatSection from "./chat-section/ChatSection";
import Sidehbar from "./chats-sidebar/Sidebar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
    },
  })
);

const HelpDesk: FC = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <ChatInfoContext.Provider value={[open, setOpen]}>
      <div className={classes.root}>
        <Sidehbar />
        <ChatSection />
        <ChatsInfo />
      </div>
    </ChatInfoContext.Provider>
  );
};

export default HelpDesk;
