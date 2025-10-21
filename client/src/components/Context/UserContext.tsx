import { createContext } from "react";
import type { UserNonSensitive } from "../../types";

export const UserContext = createContext<UserNonSensitive | null>(null)