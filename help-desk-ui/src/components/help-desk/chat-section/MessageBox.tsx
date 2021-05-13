import {
  AppBar,
  createStyles,
  IconButton,
  InputBase,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { FC, useContext, useState } from "react";
import { ReactComponent as Image } from "../../../assets/icons/add-image.svg";
import { ReactComponent as Emoji } from "../../../assets/icons/emoji.svg";
import { ReactComponent as Send } from "../../../assets/icons/send.svg";
import { socket } from "../../../App";
import { MentionContext } from "../../../contexts/mention.context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.default,
      flexDirection: "row",
      height: "3.5rem",
      padding: theme.spacing(0, 1),
    },
    input: {
      background: theme.palette.secondary.main,
      borderRadius: "2rem",
      padding: theme.spacing(1, 2),
      margin: theme.spacing(1),
    },
  })
);

const MessageBox: FC<{ username: string; id: string }> = ({ username, id }) => {
  const classes = useStyles();
  const [, setMention] = useContext(MentionContext);
  const [message, setMessage] = useState({
    message: "",
    id: id,
  });

  const onSubmit = () => {
    if (message.message === "") return;
    socket.emit("reply", { msg: message, user: username });
    socket.on("mention", (data: any) => setMention(data));
    setMessage({ ...message, message: "" });
  };

  return (
    <AppBar className={classes.root} position="relative" variant="outlined">
      <IconButton>
        <Image />
      </IconButton>
      <IconButton>
        <Emoji />
      </IconButton>
      <div className={classes.input}>
        <InputBase
          autoFocus
          value={message.message}
          onChange={(e) =>
            setMessage({ ...message, message: e.currentTarget.value })
          }
          placeholder={`send message to @${username}`}
        />
      </div>
      <IconButton
        disabled={message.message === ""}
        onClick={onSubmit}
        style={{
          paddingLeft: "0",
          paddingRight: "0.5rem",
        }}
      >
        <Send />
      </IconButton>
    </AppBar>
  );
};

export default MessageBox;
