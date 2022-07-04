import * as actions from '../actionTypes';
const initialState = {
   searchProducts: [],
   searchLoading: false
}

const searchReducer = (state = {...initialState}, action) => {
   switch (action.type) {
      case actions.GET_SEARCH:
         return {...state, searchProducts: action.payload, searchLoading: action.loading}

      case actions.CLEAR_SEARCH:
         return {...state, searchProducts: action.payload, searchLoading: action.loading}

      default:
         return state
   }
}

export default searchReducer