import { httpGet, httpPost, httpDelete } from "./index";

export const API_userInfo = () =>
  httpGet({
    url: "/api/user/info",
  });

export const API_userAddresses = () =>
  httpGet({
    url: "/api/user/address",
  });

export const API_userAddressesMain = () =>
  httpGet({
    url: `/api/user/main/${id}`,
  });

export const API_userAddressesAdd = (data) =>
  httpPost({
    url: `/api/user/address/add`,
    data,
  });

export const API_userAddressesRemove = (id) =>
  httpDelete({
    url: `/api/user/address/delete/${id}`,
    data: { id },
  });

export const API_changeMainAddress = (id) =>
  httpPost({
    url: `/api/user/address/main/${id}`,
    data: { id },
  });

export const API_userInfoUpdate = (data) =>
  httpPost({
    url: "/api/user/info/update",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });

export const API_userOrdersHistory = (params) =>
  httpGet({
    url: "/api/user/orders",
    params: {
      per_page: 10,
      ...params,
    },
  });
