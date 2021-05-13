import {
  createStyles,
  InputBase,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { MentionModel } from "../../../models/mention.model";
import { MentionContext } from "../../../contexts/mention.context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      background: theme.palette.secondary.main,
      borderRadius: "2rem",
      padding: theme.spacing(0.5, 1.5),
      margin: theme.spacing(0.875, 1.5),
    },
  })
);

const Searchbar: FC<{
  filteredMentions: MentionModel[] | null;
  setFilteredMentions: Dispatch<SetStateAction<MentionModel[] | null>>;
}> = ({ filteredMentions, setFilteredMentions }) => {
  const [mention] = useContext(MentionContext);
  const classes = useStyles();
  const [search, setSearch] = useState("");
  useEffect(() => {
    let chats: any = mention?.filter(({ user }) =>
      user.name.toLowerCase().includes(search)
    );
    setFilteredMentions(chats);
  }, [search, mention, setFilteredMentions]);

  return (
    <Paper variant="outlined" style={{ borderRadius: "0" }}>
      <div className={classes.input}>
        <SearchOutlined style={{ marginRight: "0.75rem" }} />
        <InputBase
          placeholder="search conversation"
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>
    </Paper>
  );
};
export default Searchbar;
