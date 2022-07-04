import {httpGet, httpPost} from "./index";

export const API_generateCode = (data) => httpPost({
   url: "/api/auth/code/create/",
   data,
});

export const API_updateCode = (data) => httpPost({
   url: "/api/auth/code/update",
   data,
});

export const API_updatePhone = (data) => httpPost({
   url: "/api/user/phone/update/",
   data,
});

export const API_codeVerify = (data) => httpPost({
   url: "/api/auth/verify",
   data,
});

export const API_forgotPassword = (data) => httpPost({
   url: "/api/auth/password/forgot",
   data,
});

export const API_userRegister = (data) => httpPost({
   url: "/api/auth/signup",
   data,
});

export const API_userLogin = (data) => httpPost({
   url: "/api/auth/login",
   data,
});

export const API_userRefreshToken = (rt) => httpPost({
   url: "/api/auth/refresh/token",
   data: {
      refresh_token: rt,
      provider: "users",
   },
});

export const apiLogOut = (dt) => httpGet({
   url: "/api/auth/logout",
   headers: {
      "Device-Token": dt,
   },
});


export const API_userPassChange = (data) => httpPost({
   url: '/api/auth/password/change',
   data
})