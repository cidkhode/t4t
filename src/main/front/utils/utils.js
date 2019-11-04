import {LOCAL_STORAGE_KEYS} from "./constants";

export const getUserLoggedIn = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER_EMAIL);
};