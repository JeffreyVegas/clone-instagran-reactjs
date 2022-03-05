import { TOKEN } from "./constants";
import jwtDecode from "jwt-decode";

export const setToken = (token) => {
  localStorage.setItem(TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN);
};

export const decodeToken = (token) => {
  return jwtDecode(token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};
