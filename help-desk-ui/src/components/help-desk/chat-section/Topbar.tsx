import {
  AppBar,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { ArrowForwardIosRounded, InfoOutlined } from "@material-ui/icons";
import React, { FC, useContext } from "react";
import { ChatInfoContext } from "../../../App.contexts";
import { ReactComponent as Profile } from "../../../assets/icons/profile.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.default,
      flexDirection: "row",
      height: "3.5rem",
    },
  })
);

const Topbar: FC = props => {
  const classes = useStyles();
  const [open, setOpen] = useContext(ChatInfoContext);
  return (
    <AppBar className={classes.root} variant="outlined" position="relative">
      <div>
        <IconButton>
          <Profile />
        </IconButton>
        <Typography color="textPrimary" variant="h6">
          username
        </Typography>
      </div>
      <IconButton
        onClick={() => setOpen(!open)}
        style={{ alignSelf: "center" }}
      >
        {open ? (
          <ArrowForwardIosRounded fontSize="small" color="primary" />
        ) : (
          <InfoOutlined color="primary" />
        )}
      </IconButton>
    </AppBar>
  );
};

export default Topbar;
