import {API_FetchFavourites, API_ToggleFavourite} from "../../api/favourite";
import {errorNotifier} from "./Error-Notifier";
import * as actions from '../actionTypes';

export const fetchFavourites = (page) => {
   return async (dispatch) => {
      dispatch({
         type: actions.FETCH_FAVOURITES,
         payload: {loading: true}
      })
      await API_FetchFavourites(page).then((res) => {
         dispatch({
            type: actions.FETCH_FAVOURITES,
            payload: {
               products: res.data.data,
               meta: res.data.meta,
               loading: false
            }
         })
      }).catch((e) => {
         errorNotifier(e)
         dispatch({type: actions.FETCH_FAVOURITES, payload: {loading: false}})
      })
   }
}


export const toggleFavourite = (product_id) => {
   return async (dispatch) => {
      await API_ToggleFavourite(product_id)
          .then(async (res) => {
             dispatch({
                type: actions.TOGGLE_FAVOURITE,
                payload: true
             })
             dispatch(fetchFavourites())
          })
          .catch((e) => {
             errorNotifier(e)
             dispatch({
                type: actions.TOGGLE_FAVOURITE,
                payload: false
             })
          });
   }
}