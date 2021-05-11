import {
  AppBar,
  Avatar,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { ArrowForwardIosRounded, InfoOutlined } from "@material-ui/icons";
import React, { FC, useContext } from "react";
import { ChatInfoContext } from "../../../contexts/chatInfo.context";
import { UserModel } from "../../../models/user.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.default,
      flexDirection: "row",
      height: "3.5rem",
    },
  })
);

const Topbar: FC<{ user: UserModel }> = ({ user }) => {
  const classes = useStyles();
  const [open, setOpen] = useContext(ChatInfoContext);

  return (
    <AppBar className={classes.root} variant="outlined" position="relative">
      <div>
        <IconButton>
          <Avatar
            src={user.profile_image_url_https}
            style={{ width: "2rem", height: "2rem" }}
          />
        </IconButton>
        <Typography color="textPrimary" variant="subtitle1">
          {user.name}
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
