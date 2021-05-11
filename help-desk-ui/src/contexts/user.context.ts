import { createContext } from "react";
import { UserStateContext } from "./contexts.type";

export const UserContext = createContext<UserStateContext>([
  null,
  (): any => {},
]);
