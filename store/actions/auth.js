import {
  API_codeVerify,
  API_forgotPassword,
  API_generateCode,
  API_updateCode,
  API_userLogin,
  apiLogOut,
  API_userRefreshToken,
  API_userPassChange,
  API_userRegister,
  API_updatePhone
} from "../../api/auth";
import { notifyError, notifySuccess } from "../../helpers/NotifyBtn";
import Cookies from "universal-cookie";
import { errorNotifier } from "./Error-Notifier";
import * as actions from "../actionTypes";
const cookies = new Cookies();

/* ----------------------------------------------Registration */

export const authGenerateCode = (data) => async (dispatch) => {
  await API_generateCode(data)
    .then((res) => {
      dispatch({ type: actions.GENERATE_CODE, payload: res.data });
    })
    .catch((e) => errorNotifier(e));
};

export const authVerifyPhone = (data) => async (dispatch) => {
  await API_codeVerify(data)
    .then((res) => {
      dispatch({ type: actions.VERIFY_PHONE, payload: res.data });
    })
    .catch((e) => errorNotifier(e));
};

export const authRegister = (data) => async (dispatch) => {
  await API_userRegister(data)
    .then((res) => {
      auth_cookies_setter(res.data);
      dispatch({
        type: actions.AUTH_REGISTER,
        payload: res.data,
      });
    })
    .catch((e) => errorNotifier(e));
};

/* ----------------------------------------------Login Logout */
export const authLogin = (data) => async (dispatch) => {
  await API_userLogin(data)
    .then((res) => {
      if (res.data.access_token) {
        auth_cookies_setter(res.data);
        dispatch({ type: actions.AUTH_LOGIN, payload: true });
      } else notifyError("Неверный пароль");
      dispatch({ type: actions.AUTH_LOGIN, payload: false });
    })
    .catch((e) => errorNotifier(e));
};

export const authLogout = () => async (dispatch) => {

  const cookies = new Cookies();

  await apiLogOut(cookies.get("device_token"))
    .then((res) => {
      cookies.remove("access_token", { path: "/" });
      cookies.remove("refresh_token", { path: "/" });
      cookies.remove("user_id", { path: "/" });

      dispatch({ type: actions.AUTH_LOGOUT, payload: true });
      dispatch({ type: actions.AUTH_LOGOUT, payload: false });
    })
    .catch((e) => errorNotifier(e));
};

export const refreshToken = (refr_token) => async (dispatch) => {
  await API_userRefreshToken(refr_token)
    .then((res) => {
      auth_cookies_setter(res.data);
      dispatch({ type: actions.REFRESH_TOKEN, payload: res.data });
    })
    .catch((e) => errorNotifier(e));
};

/* ----------------------------------------------Forgot Password */
export const authUpdateCode = (data) => async (dispatch) => {
  await API_updateCode(data)
    .then((res) => {
      dispatch({ type: actions.UPDATE_CODE, payload: res.data });
      notifySuccess(res.data.message || "Вы изменили номер");
    })
    .catch((e) => errorNotifier(e));
};

export const authUpdatePhone = (data) => async (dispatch) => {
  await API_updatePhone(data)
    .then((res) => {
      dispatch({ type: actions.UPDATE_USER_INFO, payload: res.data });
      notifySuccess("Вы изменили номер");
    })
    .catch((e) => errorNotifier(e));
};

export const authPasswordUpdate = (data) => async (dispatch) => {
  await API_forgotPassword(data)
    .then(() => {
      dispatch({ type: actions.AUTH_PASS_FORGOT, payload: true });
      dispatch({ type: actions.AUTH_PASS_FORGOT, payload: false });
    })
    .catch((e) => errorNotifier(e));
};

export const authPasswordChange = (data) => async (dispatch) => {
  await API_userPassChange(data)
    .then((r) => {
      notifySuccess(r.data.message);
    })
    .catch((e) => errorNotifier(e));
}

const auth_cookies_setter = (data) => {
  const today = new Date();
  const days14 = new Date();
  const days15 = new Date();
  days14.setDate(today.getDate() + 14);
  days15.setDate(today.getDate() + 15);
  cookies.set("access_token", data.access_token, {
    path: "/",
    expires: days14,
  });
  cookies.set("refresh_token", data.refresh_token, {
    path: "/",
    expires: days15,
  });
  cookies.set("user_id", data.user_id, {
    path: "/",
  });
};
