import { makeStyles, Theme, createStyles } from "@material-ui/core";
import React, { FC } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100vh",
      flexDirection: "column",
      background: theme.palette.background.default,
    },
  })
);
const ChatView: FC = props => {
  const classes = useStyles();
  return <div className={classes.root}></div>;
};

export default ChatView;
