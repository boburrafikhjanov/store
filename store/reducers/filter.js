import * as actions from '../actionTypes';

const initialState = {
    filters: {}
}

const filterReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case actions.FETCH_FILTERS:
            return {...state, filters: action.payload}

        default:
            return state
    }
}

export default filterReducer