import {SERVER_URL} from "../constants/config.jsx";

export const ApiUserRegister = "ApiUserRegister";
export const ApiUserLogin = "ApiUserLogin";

export function getRouterApi(key, param={}) {
  let routers = {
    [ApiUserRegister]: SERVER_URL + "/user/register",
    [ApiUserLogin]: SERVER_URL + "/user/login",
  };
  return(routers[key]);
}