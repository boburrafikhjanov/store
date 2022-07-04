import * as actions from '../actionTypes';

const initialState = {
   favLoading: false,
   favouriteProducts: [],
   meta: {}
};

const FavouriteReducer = (state = {...initialState}, action) => {
   switch (action.type) {
      case actions.FETCH_FAVOURITES:
         return {
            ...state,
            favouriteProducts: action.payload.products ? action.payload.products : state.favouriteProducts,
            meta: action.payload.meta ? action.payload.meta : state.meta,
            favLoading: action.payload.loading
         };
      case actions.TOGGLE_FAVOURITE:
         return {...state};

      default:
         return state;
   }
};

export default FavouriteReducer;
