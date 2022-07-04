import {Dispatch} from "redux";
import {API_FetchSimilarProds} from "../../api/product";
import {errorNotifier} from "./Error-Notifier";


export function fetchSimilarProducts(product_id) {
    return async (dispatch) => {
        await API_FetchSimilarProds(product_id)
            .then((res) => {
                dispatch({
                    type: FETCH_SIMILAR,
                    payload: res.data.data
                })
            })
            .catch((e) => {
                errorNotifier(e)
            });
    }
}

export function clearSimilarProducts() {
    return async (dispatch) => {
        dispatch({
            type: CLEAR_SIMILAR,
            payload: []
        })
    }
}