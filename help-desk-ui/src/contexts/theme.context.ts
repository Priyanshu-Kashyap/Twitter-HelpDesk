import { createContext } from "react";
import { BooleanStateContext } from "./contexts.type";

export const ThemeContext = createContext<BooleanStateContext>([
  true,
  (): any => {},
]);
