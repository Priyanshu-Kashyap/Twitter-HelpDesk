import { makeStyles, Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import React, { FC, useState } from "react";
import { ChatInfoContext } from "../../contexts/chatInfo.context";
import ChatSection from "./chat-section/ChatSection";
import Sidebar from "./chats-sidebar/Sidebar";
import { Route, Switch } from "react-router-dom";
import NoChatSelected from "./chat-section/NoChatSelected";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      background: theme.palette.background.default,
    },
  })
);

const HelpDesk: FC = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <ChatInfoContext.Provider value={[open, setOpen]}>
      <div className={classes.root}>
        <Sidebar />
        <Switch>
          <Route exact path={"/"} component={NoChatSelected} />
          <Route path={"/:id"} component={ChatSection} />
        </Switch>
      </div>
    </ChatInfoContext.Provider>
  );
};

export default HelpDesk;
