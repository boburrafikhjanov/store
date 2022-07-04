import * as actions from '../actionTypes';
const initialState = {
   deliveryOptions: [],
   paymentOptions: [],
   cities: [],
   orderAny: [],
   orderCreated: false
};

const checkoutReducer = (state = {...initialState}, action) => {
   switch (action.type) {
      case actions.FETCH_DELIVERY_TYPES:
         return {...state, deliveryOptions: action.payload};

      case actions.FETCH_PAYMENT_TYPES:
         return {...state, paymentOptions: action.payload}

      case actions.FETCH_CITIES:
         return {...state, cities: action.payload}

      case actions.MAKE_ORDER:
         return {
            ...state, 
            orderCreated: action.payload,
            orderAny: action.payload
         }

      default:
         return state;
   }
};

export default checkoutReducer;
