import * as actions from '../actionTypes';

const initialState = {
   codeGenerate: {},
   codeUpdate: {},
   phoneVerified: {},
   userRegister: {},
   tokenRefreshed: {},
   userLogout: false,
   userLogin: false,
   userPassUpdated: false
};

const authReducer = (state = {...initialState}, action) => {
   switch (action.type) {
      case actions.GENERATE_CODE:
         return {...state, codeGenerate: action.payload};

      case actions.UPDATE_CODE:
         return {...state, codeUpdate: action.payload};

      case actions.VERIFY_PHONE:
         return {...state, phoneVerified: action.payload};

      case actions.AUTH_REGISTER:
         return {...state, userRegister: action.payload};

      case actions.REFRESH_TOKEN:
         return {...state, tokenRefreshed: action.payload};

      case actions.AUTH_LOGOUT:
         return {...state, userLogout: action.payload};

      case actions.AUTH_LOGIN:
         return {...state, userLogin: action.payload};

      case actions.AUTH_PASS_FORGOT:
         return {...state, userPassUpdated: action.payload};

      default:
         return state;
   }
};

export default authReducer;
