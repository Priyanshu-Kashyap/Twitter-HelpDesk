import {
  createMuiTheme,
  createStyles,
  CssBaseline,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import React, { FC, useState } from "react";
import { ThemeContext } from "./App.contexts";
import LoginPage from "./components/auth/LoginPage";
import HelpDesk from "./components/help-desk/HelpDesk";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "linear-gradient(#1DA1F2,#FFFFFF,#406BBF)",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

const App: FC = () => {
  const [dark, setDark] = useState(true);
  const [user, setUser] = useState(true);

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
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={[dark, setDark]}>
        <div className={classes.root}>
          <CssBaseline />
          {user ? <HelpDesk /> : <LoginPage />}
        </div>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default App;
