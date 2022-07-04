import {API_fetchFilters} from "../../api/filter";
import {Dispatch} from "redux";
import {errorNotifier} from "./Error-Notifier";

import * as actions from '../actionTypes';

export function fetchFilters(params) {
    return async (dispatch) => {
        await API_fetchFilters(params)
            .then((res) => {
                dispatch({
                    type: actions.FETCH_FILTERS,
                    payload: res.data
                });
            })
            .catch((e) => {
                errorNotifier(e)
            });
    };
}