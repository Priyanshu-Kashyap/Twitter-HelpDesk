import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { FC } from "react";
import { ReactComponent as Twitter } from "../../assets/icons/twitter-white.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: "1rem",
      height: "48rem",
      width: "28rem",
      justifySelf: "center",
      alignSelf: "center",
      flexDirection: "column",
      background: theme.palette.background.default,
      position: "relative",
    },
    header: {
      borderRadius: "1rem 1rem 0 0",
      height: "50%",
      justifyContent: "center",
      background: theme.palette.primary.main,
      flexDirection: "column",
    },
    loginArea: {
      height: "50%",
      justifyContent: "center",
    },
  })
);

const LoginPage: FC<any> = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Twitter style={{ transform: "translateX(-2rem)" }} />
        <em style={{ transform: "translateX(2rem)", fontSize: "2rem" }}>
          HelpDesk
        </em>
      </div>
      <div className={classes.loginArea}>
        <Button
          onClick={() => props.user(true)}
          style={{
            borderRadius: "4rem",
            background: "#1DA1F2",
            color: "white",
            padding: "0.5rem 1.5rem",
            fontSize: "0.8rem",
          }}
          variant="contained"
        >
          continue to twitter helpdesk
        </Button>
      </div>
    </div>
  );
};
export default LoginPage;
