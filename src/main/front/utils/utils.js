import {LOCAL_STORAGE_KEYS} from "./constants";

export const isUserLoggedIn = () => {
  const userEmail = localStorage.getItem(LOCAL_STORAGE_KEYS.LOGGED_IN_USER_EMAIL);
  return !!userEmail;
};