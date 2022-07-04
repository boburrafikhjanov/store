import * as actions from '../actionTypes';

const initialState = {
    similar: []
}

const productReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case actions.FETCH_SIMILAR:
            return {...state, similar: action.payload}

        case actions.CLEAR_SIMILAR:
            return {...state, similar: action.payload}
        default:
            return state
    }
}
export default productReducer