import { createContext } from "react";

export const UserContext = createContext({
    _id: '',
    email: '',
    username: '',
    accessToken: '',
    userLoginHandler: (authData = {}) => null,
    userLogoutHandler: () => null,
})