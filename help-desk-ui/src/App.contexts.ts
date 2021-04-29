import { Dispatch, createContext } from "react";

type BooleanStateContext = [boolean, Dispatch<React.SetStateAction<boolean>>];

export const ThemeContext = createContext<BooleanStateContext>([
  true,
  (): any => {},
]);
export const ChatInfoContext = createContext<BooleanStateContext>([
  true,
  (): any => {},
]);
