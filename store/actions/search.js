import {Dispatch} from "redux";
import {API_Search} from "../../api/search";
import {errorNotifier} from "./Error-Notifier";

import * as actions from '../actionTypes';

export const getSearchResults = (search) => {
    return async (dispatch) => {
        await API_Search(search).then((res) => {
            dispatch({
                type: actions.GET_SEARCH,
                payload: res.data.products || [],
                meta: res.data.meta || {},
                loading: false
            })
        }).catch((e) => {
            errorNotifier(e)
        });
    }
}

export const clearSearchResults = () => {
    return async (dispatch) => {
        dispatch({
            type: actions.CLEAR_SEARCH,
            payload: [],
            meta: {},
            loading: true
        })
    }
}