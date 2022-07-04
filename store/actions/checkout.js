import {Dispatch} from "redux";
// import {notifyError} from "../../helpers/NotifyBtn";
import {API_Cities, API_DeliveryOptions, API_MakeOrder, API_PaymentOptions} from "../../api/checkout";
import {errorNotifier} from "./Error-Notifier";
import * as actions from '../actionTypes';

export const  createOrder = (data) => async (dispatch) => {
   
   await API_MakeOrder(data).then((res) => {
      dispatch({
         type: actions.MAKE_ORDER, 
         payload: {
            orderCreated:true,
            orderAny: res.data.data
         },
      })
      dispatch({
         type: actions.MAKE_ORDER, payload: false
      })
   }).catch((e) => errorNotifier(e))
}

export function fetchDeliveryOptions() {
   return async (dispatch) => {
      await API_DeliveryOptions()
          .then((res) => {
             dispatch({
                type: actions.FETCH_DELIVERY_TYPES,
                payload: res.data.data
             });
          })
          .catch((e) => {
             errorNotifier(e);
          });
   };
}

export function fetchPaymentOptions() {
   return async (dispatch) => {
      await API_PaymentOptions()
          .then((res) => {
             dispatch({
                type: actions.FETCH_PAYMENT_TYPES,
                payload: res.data.data
             });
          })
          .catch((e) => {
             errorNotifier(e);
          });
   };
}

export const fetchCities = () => async (dispatch) => {
   await API_Cities().then((res) => dispatch(
       {type: actions.FETCH_CITIES, payload: res.data.data}
   )).catch((e) => console.log(e))
}