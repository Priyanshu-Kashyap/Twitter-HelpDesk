import {
  AppBar,
  Avatar,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import React, { FC, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Moon } from "../../../assets/icons/moon.svg";
import { ReactComponent as Sun } from "../../../assets/icons/sun.svg";
import { ReactComponent as Twitter } from "../../../assets/icons/twitter-blue.svg";
import { ThemeContext } from "../../../contexts/theme.context";
import { UserContext } from "../../../contexts/user.context";
import { logout } from "../../../services/auth.service";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.default,
      flexDirection: "row",
      height: "3.5rem",
    },
    content: {
      justifyContent: "space-between",
    },
    scaleDown: {
      "&:hover": {
        transform: "scale(0.9)",
      },
    },
    tooltip: {
      position: "absolute",
      fontSize: "0.75rem",
      transform: "translateY(150%)",
      padding: theme.spacing(0.5, 1),
      borderRadius: "1rem",
      background: theme.palette.secondary.main,
      opacity: "75%",
    },
  })
);
const HelpDeskHeader: FC = (props) => {
  const classes = useStyles();
  const [dark, setDark] = useContext(ThemeContext);
  const [user, setUser] = useContext(UserContext);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const handleLogout = () => {
    history.push("/");
    logout()
      .then((_) => setUser(null))
      .catch((err) => console.log(err));
  };
  return (
    <AppBar variant="outlined" position="relative" className={classes.root}>
      <div style={{ marginLeft: "0.5rem" }}>
        <Twitter />
        <Typography style={{ fontSize: "1.5rem" }} color="primary">
          HelpDesk
        </Typography>
      </div>
      <div style={{ justifyContent: "flex-end" }}>
        <IconButton
          onMouseOver={() => setShow(true)}
          onMouseOut={() => {
            setShow(false);
          }}
          style={{ position: "relative" }}
        >
          <Avatar
            className={classes.scaleDown}
            style={{ height: "2rem", width: "2rem" }}
            src={user?.profile_image_url_https}
          />
          {show ? (
            <Typography className={classes.tooltip} color={"textPrimary"}>
              {user?.screen_name}
            </Typography>
          ) : (
            <></>
          )}
        </IconButton>
        <IconButton onClick={() => setDark(!dark)}>
          {dark ? (
            <Moon className={classes.scaleDown} />
          ) : (
            <Sun className={classes.scaleDown} />
          )}
        </IconButton>
        <IconButton onClick={handleLogout}>
          <ExitToAppRoundedIcon
            className={classes.scaleDown}
            style={{ fontSize: "2rem" }}
          />
        </IconButton>
      </div>
    </AppBar>
  );
};

export default HelpDeskHeader;
