
import {API_HOME} from "../../api/home";
import {errorNotifier} from "./Error-Notifier";
import * as actions from '../actionTypes';
export function fetchBrands() {
    return async (dispatch) => {
        await API_HOME("brand")
            .then((res) => {
                dispatch({
                    type: actions.FETCH_BRANDS,
                    payload: res.data.data.brands,
                });
            })
            .catch((e) => {
                errorNotifier(e)
            });
    };
}

export function fetchHomeProducts(type) {
    return async (dispatch) => {
        dispatch({
            type: actions.FETCH_SECTION_PRODUCTS,
            payload: {
                products: [],
                loading: true,
                type
            }
        })
        await API_HOME(type)
            .then((res) => {
                dispatch({
                    type: actions.FETCH_SECTION_PRODUCTS,
                    payload: {
                        products: res.data.data,
                        loading: false,
                        type
                    },
                });
            })
            .catch((e) => {
                errorNotifier(e)
            });
    };
}