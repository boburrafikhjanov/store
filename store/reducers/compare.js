import * as actions from '../actionTypes';
const initialState = {
    compared: false,
    compareFeatures: [],
    compareProducts: [],
    classes: []
};

const compareReducer = (state = {...initialState}, action)=> {
    switch (action.type) {
        case actions.FETCH_COMPARE:
            return {
                ...state,
                compareProducts: action.payload.products,
                compareFeatures: action.payload.features
            };
        case actions.TOGGLE_COMPARE:
            return {...state, compared: action.payload};

        case actions.FETCH_COMPARE_CLASSES:
            return {...state, classes: action.payload}

        default:
            return state;
    }
};

export default compareReducer;
