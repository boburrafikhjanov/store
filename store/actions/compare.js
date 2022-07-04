import {Dispatch} from "redux";
import {API_FetchCompare, API_FetchCompareClasses, API_ToggleComparison} from "../../api/compare";
import {errorNotifier} from "./Error-Notifier";

import * as actions from '../actionTypes';
export const fetchCompare = (class_id = undefined) => {
    return async (dispatch) => {
        await API_FetchCompare(class_id).then((res) => {
            dispatch({
                type: actions.FETCH_COMPARE,
                payload: {
                    features: res.data.data.features,
                    products: res.data.data.products
                }
            })
        }).catch((e) => errorNotifier(e))
    }
}

export const fetchCompareClasses = () => {
    return async (dispatch) => {
        await API_FetchCompareClasses()
            .then((res) => {
                dispatch({
                    type: actions.FETCH_COMPARE_CLASSES,
                    payload: res.data.data.classes
                })
            }).catch((e) => errorNotifier(e))
    }
}

export const toggleCompare = (product_id , class_id = undefined) => {
    return async (dispatch) => {
        await API_ToggleComparison(product_id)
            .then(async (res) => {
                dispatch({
                    type: actions.TOGGLE_COMPARE,
                    payload: true
                })
            })
            .catch((e) => {
                errorNotifier(e)
                dispatch({
                    type: actions.TOGGLE_COMPARE,
                    payload: false
                })
            });
    }
}

