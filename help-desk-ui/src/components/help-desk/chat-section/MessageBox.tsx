import {
  AppBar,
  createStyles,
  IconButton,
  InputBase,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { FC } from "react";
import { ReactComponent as Image } from "../../../assets/icons/add-image.svg";
import { ReactComponent as Emoji } from "../../../assets/icons/emoji.svg";
import { ReactComponent as Send } from "../../../assets/icons/send.svg";

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

const MessageBox: FC = props => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="relative" variant="outlined">
      <IconButton>
        <Image />
      </IconButton>
      <IconButton>
        <Emoji />
      </IconButton>
      <div className={classes.input}>
        <InputBase placeholder="write a message" />
      </div>
      <IconButton>
        <Send />
      </IconButton>
    </AppBar>
  );
};

export default MessageBox;
