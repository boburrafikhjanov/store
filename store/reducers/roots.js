import { combineReducers } from "redux";
import authReducer from "./auth";
import categoriesReducer from "./categories";
import homeReducer from "./home";
import filterReducer from "./filter";
import cartReducer from "./cart";
import productReducer from "./product";
import compareReducer from "./compare";
import searchReducer from "./search";
import FavouriteReducer from "./favourite";
import bannerReducer from "./banner";
import checkoutReducer from "./checkout";
import profileReducer from "./profile";

const rootReducer = combineReducers({
   auth: authReducer,
   category: categoriesReducer,
   home: homeReducer,
   filters: filterReducer,
   cart: cartReducer,
   product: productReducer,
   compare: compareReducer,
   search: searchReducer,
   favourite: FavouriteReducer,
   banners: bannerReducer,
   checkout: checkoutReducer,
   profile: profileReducer,
});


export default rootReducer;
