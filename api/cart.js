import { httpDelete, httpGet, httpPost } from "./index";

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const API_fetchCart = (params = undefined) =>
  httpGet({
    url: "/api/cart/show",
    params
  });

export const API_AddToCart = (id, quantity,partner_installment_id,props) =>
  httpPost({
    url: "/api/cart/add",
    data: {
      device_token: cookies.get("device_token"),
      device_type: cookies.get("device_type"),
      item_shop_id: id,
      quantity,
      partner_installment_id,
      ...props
    },
  });

export const API_DeleteFromCart = (id) =>
  httpDelete({
    url: "/api/cart/delete",
    data: { item_shop_id: id },
  });

  export const API_updatePartnerApi = (props) => httpPost({
    url: '/api/cart/update-partner',
    data: {
       device_token: cookies.get("device_token"),
       device_type: cookies.get("device_type"),
       ...props
    }
 });

  export const API_updatePartnerPayment = (value, ...props) => httpPost({
    url: '/api/cart/update-partner-with-payment',
    data: {
       device_token: cookies.get("device_token"),
       device_type: cookies.get("device_type"),
       payment_id: value,
       ...props
    }
 })
