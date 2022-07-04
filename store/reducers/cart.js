import * as actions from "../actionTypes";

const initialState = {
  cart: {},
  adding: false,
  cartLoading: false
};

const cartReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actions.ADD_TO_CART:
      return {
        ...state,
        cart: action.payload.cart ? action.payload.cart : state.cart,
        adding: action.payload.adding,
      };
    case actions.FETCH_CART:
      return { ...state, cart: action.payload.cart, cartLoading: action.payload.cartLoading };

    case actions.DELETE_FROM_CART:
      return { ...state, cart: action.payload };

      case actions.UPDATE_PARTNER_WITH_PAYMENT_CART: 
        return {
          ...state,
          cart: action.payload.cart,
        }
    default:
      return state;
  }
};

export default cartReducer;

