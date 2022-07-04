import * as actions from "../actionTypes";

const initialState = {
  userInfo: {},
  userAddresses: [],
  orders: [],
  ordersMeta: {},
  order: undefined,
  mainAddressChanged: false
};

const profileReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actions.FETCH_USER_INFO:
      return { ...state, userInfo: action.payload };

    case actions.FETCH_USER_ADDRESSES:
      return { ...state, userAddresses: action.payload };

    case actions.FETCH_USER_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        ordersMeta: action.payload.meta,
      };

    case actions.FETCH_USER_ORDER:
      return { ...state, order: action.payload };

    case actions.UPDATE_USER_INFO:
      return { ...state, userInfo: action.payload };

      case actions.CHANGE_MAIN_USER_ADDRESS:
        return{...state, mainAddressChanged: action.payload}

    default:
      return state;
  }
};

export default profileReducer;
