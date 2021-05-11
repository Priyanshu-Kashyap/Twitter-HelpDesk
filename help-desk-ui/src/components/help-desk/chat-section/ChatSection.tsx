import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { FC, useContext, useState } from "react";
import ChatView from "./ChatView";
import Topbar from "./Topbar";
import MessageBox from "./MessageBox";
import { useParams } from "react-router-dom";
import { MentionContext } from "../../../contexts/mention.context";
import ChatInfo from "./ChatInfo";
import { ChatInfoContext } from "../../../contexts/chatInfo.context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      height: "100vh",
      flexDirection: "column",
      justifyContent: "space-between",
      background: theme.palette.background.paper,
      overflow: "auto",
    },
  })
);
const ChatSection: FC = (props) => {
  const classes = useStyles();
  const { id } = useParams<{ id: string | undefined }>();
  const [mentions] = useContext(MentionContext);
  const [chat]: any = mentions?.filter((chat) => chat.id_str === id);
  const [open, setOpen] = useState(false);

  return (
    <>
      <ChatInfoContext.Provider value={[open, setOpen]}>
        <div className={classes.root}>
          <Topbar user={chat.user} />
          <ChatView chat={chat} />
          <MessageBox username={chat.user.screen_name} id={chat.id_str} />
        </div>
        <ChatInfo user={chat.user} />
      </ChatInfoContext.Provider>
    </>
  );
};

export default ChatSection;
