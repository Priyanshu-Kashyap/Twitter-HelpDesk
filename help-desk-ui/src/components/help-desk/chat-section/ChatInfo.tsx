import {
  AppBar,
  Avatar,
  createStyles,
  Divider,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { FC, useContext } from "react";
import { ChatInfoContext } from "../../../contexts/chatInfo.context";
import { UserModel } from "../../../models/user.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (open) => ({
      height: "100%",
      borderRadius: "0",
      width: open ? "50%" : "0",
      display: open ? "flex" : "none",
      flexDirection: "column",
    }),
    nav: {
      flexDirection: "row",
      alignSelf: "flex-start",
      alignItems: "center",
      background: theme.palette.background.paper,
      height: "3.5rem",
      justifyContent: "space-between",
      padding: theme.spacing(0, 2),
    },
    userInfo: {
      padding: theme.spacing(2, 4),
      flexDirection: "column",
      alignItems: "flex-start",
    },
  })
);
const ChatsInfo: FC<{ user: UserModel }> = ({ user }) => {
  const [open] = useContext(ChatInfoContext);
  const classes = useStyles(open);
  return (
    <Paper className={classes.root} variant="outlined">
      <AppBar variant="outlined" position="static" className={classes.nav}>
        <Typography variant="h6" color="textPrimary">
          Conversation Info
        </Typography>
      </AppBar>
      <div className={classes.userInfo}>
        <Avatar
          src={user.profile_image_url_https}
          style={{
            width: "8rem",
            height: "8rem",
            alignSelf: "center",
            margin: "1rem 0",
          }}
        />
        <Typography variant={"h6"}>{user.name}</Typography>
        <Typography color={"textSecondary"} variant={"subtitle1"}>
          @{user.screen_name}
        </Typography>
        <Divider
          variant={"fullWidth"}
          style={{ width: "100%", margin: "1rem", alignSelf: "center" }}
        />
        {user.location !== "" ? (
          <Typography>Location: {user.location}</Typography>
        ) : (
          <></>
        )}
      </div>
    </Paper>
  );
};

export default ChatsInfo;
