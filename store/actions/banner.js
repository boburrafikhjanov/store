import {API_Banners} from "../../api/banners";

import * as actions from '../actionTypes';


export function fetchBanners() {
   return async dispatch => {
      dispatch({
         type: actions.FETCH_BANNERS,
         payload: {banners: [], loading: true}
      })
      await API_Banners().then((res) => {
         dispatch({
            type: actions.FETCH_BANNERS,
            payload: {banners: res.data.data, loading: false}
         })
      })
   }
}
