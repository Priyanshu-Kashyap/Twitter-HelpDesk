import {
  AppBar,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import React, { FC, useContext } from "react";
import { ThemeContext } from "../../../App.contexts";
import { ReactComponent as Moon } from "../../../assets/icons/moon.svg";
import { ReactComponent as Profile } from "../../../assets/icons/profile.svg";
import { ReactComponent as Sun } from "../../../assets/icons/sun.svg";
import { ReactComponent as Twitter } from "../../../assets/icons/twitter-blue.svg";

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
  })
);
const HelpDeskHeader: FC = props => {
  const classes = useStyles();
  const [dark, setDark] = useContext(ThemeContext);
  return (
    <AppBar variant="outlined" position="relative" className={classes.root}>
      <div style={{ marginLeft: "0.5rem" }}>
        <Twitter />
        <Typography style={{ fontSize: "1.5rem" }} color="primary">
          HelpDesk
        </Typography>
      </div>
      <div style={{ justifyContent: "flex-end" }}>
        <IconButton>
          <Profile className={classes.scaleDown} />
        </IconButton>
        <IconButton onClick={() => setDark(!dark)}>
          {dark ? (
            <Moon className={classes.scaleDown} />
          ) : (
            <Sun className={classes.scaleDown} />
          )}
        </IconButton>
        <IconButton>
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
