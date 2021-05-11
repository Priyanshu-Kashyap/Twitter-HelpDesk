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
      backgroundColor: "#000000",
      backgroundImage: "linear-gradient(315deg, #000000 0%, #414141 74%)",
      position: "relative",
      boxShadow:
        "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
    },
    header: {
      borderRadius: "1rem 1rem 0 0",
      height: "50%",
      justifyContent: "center",
      background: "#045de9",
      backgroundImage: "linear-gradient(315deg, #045de9 0%, #09c6f9 74%)",
      flexDirection: "column",
    },
    loginArea: {
      height: "50%",
      justifyContent: "center",
    },
  })
);

const LoginPage: FC<any> = (props) => {
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
          href="http://localhost:5000/auth/twitter"
          style={{
            background: "#045de9",
            backgroundImage: "linear-gradient(315deg, #045de9 0%, #09c6f9 74%)",
            borderRadius: "4rem",
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
