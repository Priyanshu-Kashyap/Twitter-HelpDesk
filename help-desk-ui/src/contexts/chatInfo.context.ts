import { createContext } from "react";
import { BooleanStateContext } from "./contexts.type";

export const ChatInfoContext = createContext<BooleanStateContext>([
  true,
  (): any => {},
]);
