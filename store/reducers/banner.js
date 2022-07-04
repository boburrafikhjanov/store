import * as actions from '../actionTypes';


const initialState = {
   banners: [],
   loading: false
};

const bannerReducer = (state = {...initialState}, action) => {
   switch (action.type) {
      case actions.FETCH_BANNERS:
         return {...state, banners: action.payload.banners, loading: action.payload.loading};

      default:
         return state;
   }
};

export default bannerReducer;
