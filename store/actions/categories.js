import {
    API_fetchCategories,
    API_filter_category_products,
 } from "../../api/categories";
 import {errorNotifier} from "./Error-Notifier";
 import * as actions from '../actionTypes';

 export function fetchCategories() {
    return async (dispatch) => {
       await API_fetchCategories()
          .then((res) => {
             dispatch({
                type: actions.FETCH_CATEGORIES,
                payload: res.data.data,
             });
          })
          .catch((e) => {
             errorNotifier(e);
          });
    };
 }
 
 export function fetchCategoryFilteredProducts(params) {
    return async (dispatch) => {
       dispatch({
          type: actions.FETCH_CATEGORY_PRODUCTS,
          payload: {
             products: [],
             meta: {},
             loading: true,
          },
          params,
       });
       await API_filter_category_products(params)
          .then((res) => {
             dispatch({
                type: actions.FETCH_CATEGORY_PRODUCTS,
                payload: {
                   products: res.data.data,
                   meta: res.data.meta,
                   loading: false,
                },
                params,
             });
          })
          .catch((e) => {
             errorNotifier(e);
             dispatch({
                type: actions.FETCH_CATEGORY_PRODUCTS,
                payload: {
                   products: [],
                   meta: {},
                   loading: false,
                },
                params,
             });
          });
    };
 }
 
 export function clearFilteredProducts(meta) {
    return async (dispatch) => {
       dispatch({
          type: actions.CLEAR_FILTER_CAT_PRODUCTS,
          payload: {
             products: [],
             meta,
             loading: false,
          },
       });
    };
 }
 