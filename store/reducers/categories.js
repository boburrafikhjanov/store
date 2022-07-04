import * as actions from '../actionTypes';

const initialState = {
    categories: [],
    filteredProducts: {
        products: [],
        meta: {},
        loading: false
    },
    params: {}
};

const categories = (state = {...initialState}, action) => {
    switch (action.type) {
        case actions.FETCH_CATEGORIES:
            return {...state, categories: action.payload};
        case actions.FETCH_CATEGORY_PRODUCTS:
            return {...state, filteredProducts: action.payload, params: action.params}
        case actions.CLEAR_FILTER_CAT_PRODUCTS:
            return {...state, filteredProducts: action.payload}
        default:
            return state;
    }
};

export default categories;
