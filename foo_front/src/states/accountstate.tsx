import { createContext } from "react";


export const AccountState = createContext({ isLogin: false, loginUser: {}, profile: {} });