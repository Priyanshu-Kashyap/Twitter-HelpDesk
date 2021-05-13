import {
  createMuiTheme,
  createStyles,
  CssBaseline,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import React, { FC, useEffect, useState } from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import { connect } from "socket.io-client";
import LoginPage from "./components/auth/LoginPage";
import HelpDesk from "./components/help-desk/HelpDesk";
import { MentionContext } from "./contexts/mention.context";
import { ThemeContext } from "./contexts/theme.context";
import { UserContext } from "./contexts/user.context";
import { MentionModel } from "./models/mention.model";
import { UserModel } from "./models/user.model";
import { getUser } from "./services/auth.service";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background:
        "url('https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png')",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);
export const socket = connect(process.env.REACT_APP_API_BASE_URL as string);
const App: FC = () => {
  const [dark, setDark] = useState(true);
  const [user, setUser] = useState<UserModel | null>(null);
  const [mention, setMention] = useState<MentionModel[] | null>(null);
  useEffect(() => {
    getUser()
      .then((res: UserModel) => {
        setUser(res);
        socket.on("connect", () => {
          socket.emit("login", { user: res?.screen_name });
          socket.on("mention", (data: any) => setMention(data));
        });
      })
      .catch((err) => console.log(err));

    return () => {
      socket.close();
    };
  }, []);

  const darkTheme: PaletteOptions = {
    type: "dark",
    background: {
      default: "#111316",
      paper: "#16181c",
    },
    primary: {
      main: "#4d9fec",
    },
    secondary: {
      main: "#212327",
    },
  };
  const lightTheme: PaletteOptions = {
    type: "light",
    background: {
      default: "#ffffff",
      paper: "#f7f9fa",
    },
    primary: {
      main: "#4d9fec",
    },
    secondary: {
      main: "#ebeef0",
    },
  };
  const theme = createMuiTheme({
    palette: dark ? darkTheme : lightTheme,
  });
  const classes = useStyles();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={[user, setUser]}>
          <ThemeContext.Provider value={[dark, setDark]}>
            <MentionContext.Provider value={[mention, setMention]}>
              <div className={classes.root}>
                <CssBaseline />
                <Redirect from={"/*"} to={"/"} />
                {user ? <HelpDesk /> : <LoginPage />}
              </div>
            </MentionContext.Provider>
          </ThemeContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
