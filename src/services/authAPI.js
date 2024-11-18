import {toast} from "react-hot-toast"

import { setUserLogin } from "../stores/slices/authSlice";
import {httpPost} from "./http-api.js";
import {ApiUserRegister, getRouterApi} from "./index.js";

// ================ sign Up ================
export function http_signup(role, email, username, password) {
  return async (dispatch) => {
    try {
      const response = await httpPost(getRouterApi(ApiUserRegister), {
        role,
        email,
        username,
        password,
      })

      return(response.data);
    } catch (error) {
      toast.error(error.message)
      return ({status: false, msg: error.message});
    }
  }
}


// ================ Login ================
export function http_login(email, password) {
  return async (dispatch) => {
    try {
      const response = await httpPost(getRouterApi(ApiUserLogin), {
        email,
        password,
      })

      if (!response?.data?.status) {
        return(response.data);
      }

      dispatch(setUserLogin({token: response.data.data.token, user: response.data.data}));
      return(response.data);
    } catch (error) {
      toast.error(error.message)
      return ({status: false, msg: error.message});
    }
  }
}

// ================ Logout ================
export function http_logout(navigate) {
  return (dispatch) => {
    dispatch(setUserLogin({token: "", user: null}));
    navigate("/");
  }
}
