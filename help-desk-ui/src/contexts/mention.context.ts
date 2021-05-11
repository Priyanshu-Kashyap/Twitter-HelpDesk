import { createContext } from "react";
import { MentionStateContext } from "./contexts.type";

export const MentionContext = createContext<MentionStateContext>([
  null,
  (): any => {},
]);
