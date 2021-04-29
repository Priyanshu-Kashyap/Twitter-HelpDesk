import {
  AppBar,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { FC, useContext } from "react";
import { ChatInfoContext } from "../../../App.contexts";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: open => ({
      height: "100%",
      borderRadius: "0",
      width: open ? "50%" : "0",
      display: open ? "flex" : "none",
    }),
    nav: {
      flexDirection: "row",
      alignSelf: "flex-start",
      alignItems: "center",
      background: theme.palette.background.paper,
      height: "3.5rem",
      justifyContent: "space-between",
      padding: theme.spacing(0, 2),
    },
  })
);
const ChatsInfo: FC = props => {
  const [open] = useContext(ChatInfoContext);
  const classes = useStyles(open);
  return (
    <Paper className={classes.root} variant="outlined">
      <AppBar variant="outlined" position="static" className={classes.nav}>
        <Typography variant="h6" color="textPrimary">
          Conversation Info
        </Typography>
      </AppBar>
    </Paper>
  );
};

export default ChatsInfo;
