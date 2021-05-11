import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { FC } from "react";
import ChatsOverview from "./ChatsOverview";
import HelpDeskHeader from "./HelpDeskHeader";
import Searchbar from "./Searchbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      maxWidth: "25rem",
      minWidth: "22rem",
      flexDirection: "column",
    },
  })
);

const Sidebar: FC = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <HelpDeskHeader />
      <Searchbar />
      <ChatsOverview />
    </div>
  );
};

export default Sidebar;
