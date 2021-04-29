import { createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import React, { FC } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      borderRadius: "0",
    },
  })
);

const ChatsOverview: FC = props => {
  const classes = useStyles();
  return <Paper variant="outlined" className={classes.root}></Paper>;
};

export default ChatsOverview;
