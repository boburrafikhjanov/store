import { Dispatch } from "redux";
import {
  API_userAddresses,
  API_userInfoUpdate,
  API_userInfo,
  API_userOrdersHistory,
  API_userAddressesAdd,
  API_userAddressesRemove,
  API_changeMainAddress
} from "../../api/profile";
import { errorNotifier } from "./Error-Notifier";

import { notifyError, notifySuccess } from "../../helpers/NotifyBtn";
import * as actions from "../actionTypes";

export const profileInfo = () => async (dispatch) => {
  await API_userInfo()
    .then((res) => {
      dispatch({
        type: actions.FETCH_USER_INFO,
        payload: res.data.data,
      });
    })
    .catch((e) => errorNotifier(e));
};

export const getUserAddresses = () => async (dispatch) => {
  await API_userAddresses()
    .then((res) => {
      dispatch({ type: actions.FETCH_USER_ADDRESSES, payload: res.data.data });
    })
    .catch((e) => errorNotifier(e));
};

export const getUserOrders = (params) => async (dispatch) => {
  await API_userOrdersHistory(params)
    .then((res) => {
      dispatch({
        type: actions.FETCH_USER_ORDERS,
        payload: {
          orders: res.data.data,
          meta: res.data.meta,
        },
      });
    })
    .catch((e) => errorNotifier(e));
};

export const getUserOrder = (id, code) => async (dispatch) => {
  let params = { order_id: id };
  if (code && code.length) {
    params = { ...params, code };
  }
  await API_userOrdersHistory(params)
    .then((res) => {
      dispatch({
        type: actions.FETCH_USER_ORDER,
        payload: res.data.data,
      });
    })
    .catch((e) => errorNotifier(e));
};

export const updateProfileInfo = (data) => async (dispatch) => {
  await API_userInfoUpdate(data)
    .then((res) => {
      dispatch({
        type: actions.UPDATE_USER_INFO,
        payload: res.data.data,
      });
    })
    .catch((e) => errorNotifier(e));
};

export const clearUserOrder = (params) => async (dispatch) => {
  await API_userOrdersHistory(params)
    .then((res) => {
      dispatch({
        type: actions.FETCH_USER_ORDERS,
        payload: undefined,
      });
    })
    .catch((e) => errorNotifier(e));
};

export const changeUserMainAddr = (id) => async (dispatch) => {
  await API_userAddressesAdd(id)
  .then(() => {
    dispatch({ 
      type: actions.CHANGE_MAIN_ADDR, 
      payload: true });
    dispatch({ 
      type: actions.CHANGE_MAIN_ADDR, 
      payload: false 
    })
    dispatch(getUserAddresses())
    notifySuccess("У вас новый адрес")
  })
  .catch((e) => errorNotifier(e));
};

export const removeAdress = (id) =>{
  return async (dispatch) => {
    await API_userAddressesRemove(id)
    .then((res)=>{
      dispatch({
        type: actions.DELETE_FROM_ADDRESS,
        payload: res.data.data
      })
      dispatch(getUserAddresses())
    })
    .catch((e) => {
      errorNotifier(e)
   })
  }
}

export const changeMain = (id) =>{
  return async (dispatch) =>{
    await API_changeMainAddress(id)
    .then((res)=>{
      dispatch({
        type: actions.CHANGE_MAIN_USER_ADDRESS,
        payload: true
      })
      dispatch({
        type: actions.CHANGE_MAIN_USER_ADDRESS,
        payload: false
      })
      dispatch(getUserAddresses())
    })
    .catch((e) => {
      errorNotifier(e)
   })
  }
}