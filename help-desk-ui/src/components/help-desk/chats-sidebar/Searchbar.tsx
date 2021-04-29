import {
  createStyles,
  InputBase,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

import React, { FC } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      background: theme.palette.secondary.main,
      borderRadius: "0.5rem",
      padding: theme.spacing(0.5, 1.5),
      margin: theme.spacing(0.875, 1.5),
    },
  })
);

const Searchbar: FC = props => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" style={{ borderRadius: "0" }}>
      <div className={classes.input}>
        <SearchOutlined style={{ marginRight: "0.75rem" }} />
        <InputBase placeholder="search conversation" />
      </div>
    </Paper>
  );
};

export default Searchbar;
