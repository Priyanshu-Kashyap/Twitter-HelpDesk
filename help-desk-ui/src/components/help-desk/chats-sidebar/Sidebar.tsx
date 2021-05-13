import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { FC, useContext, useEffect, useState } from "react";
import ChatsOverview from "./ChatsOverview";
import HelpDeskHeader from "./HelpDeskHeader";
import Searchbar from "./Searchbar";
import { MentionContext } from "../../../contexts/mention.context";
import { MentionModel } from "../../../models/mention.model";

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
  const [mention] = useContext(MentionContext);
  const [filteredMentions, setFilteredMentions] = useState<
    MentionModel[] | null
  >(mention);
  useEffect(() => {
    setFilteredMentions(mention);
  }, [mention]);
  return (
    <div className={classes.root}>
      <HelpDeskHeader />
      <Searchbar
        setFilteredMentions={setFilteredMentions}
        filteredMentions={filteredMentions}
      />
      <ChatsOverview filteredMentions={filteredMentions} />
    </div>
  );
};

export default Sidebar;
