import {
  API_AddToCart,
  API_DeleteFromCart,
  API_fetchCart,
  API_updatePartnerApi,
  API_updatePartnerPayment,
  
} from "../../api/cart";
import { errorNotifier } from "./Error-Notifier";
import * as actions from "../actionTypes";


export function fetchCart(params = undefined) {
  return async (dispatch) => {
     dispatch({
        type: actions.FETCH_CART,
        payload: {
           cart: {},
           cartLoading: true
        },
     });
     await API_fetchCart(params)
         .then((res) => {
            dispatch({
               type: actions.FETCH_CART,
               payload: {
                  cart: res.data.data,
                  cartLoading: false
               },
            })
         })
         .catch((e) => {
            errorNotifier(e);
            dispatch({
               type: actions.FETCH_CART,
               payload: { cart: {}, cartLoading: false },
            });
         });
  };
}

export function addToCart(id, quantity, ...props) {
  return async (dispatch) => {
    dispatch({
      type: actions.ADD_TO_CART,
      payload: { adding: true },
    });
    await API_AddToCart(id, quantity, ...props)
      .then((res) => {
        dispatch({
          type: actions.ADD_TO_CART,
          payload: { cart: res.data.data, adding: false },
        });
        dispatch(fetchCart());
      })
      .catch((e) => {
        errorNotifier(e);
        dispatch({
          type: actions.ADD_TO_CART,
          payload: { adding: false },
        });
      });
  };
}

export function deleteFromCart(id) {
  return async (dispatch) => {
    await API_DeleteFromCart(id)
      .then((res) => {
        dispatch({
          type: actions.DELETE_FROM_CART,
          payload: res.data.data,
        });
      })
      .catch((e) => {
        errorNotifier(e);
      });
  };
}

export function updatePartnerWithPayment(value, success){
  return async (dispatch) =>{
      const req = await API_updatePartnerPayment(value)
          .then((res)=>{
              success(res.data.data);
              return res.data.data;
          })
          .catch((err)=>{
              console.log(err);
              notifyError(err);
          });
      dispatch({
          type: actions.UPDATE_PARTNER_WITH_PAYMENT_CART,
          payload: req,
          success
      });
  }
}

export function updatePartner(value, success){
  return async (dispatch) =>{
      const req = await API_updatePartnerApi(value)
          .then((res)=>{
              success(res.data.data);
              return res.data.data;
          })
          .catch((err)=>{
              console.log(err);
              notifyError(err);
          });
      dispatch({
          type: actions.UPDATE_PARTNER_CART,
          payload: req,
          success
      });
  }
}
