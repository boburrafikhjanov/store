import * as actions from "../actionTypes";
const initialState = {
  brands: [],
  popularProducts: [],
  newProducts: [],
  hotProducts: [],
  recommendedProducts: [],
  maxPriceMillion: [],
  maxPriceHalfMillion: [],
  maxPriceTwoHundredThousands: [],
  weekProducts: [],
  hloading: false,
  ploading: false,
  nloading: false,
  rloading: false,
  wloading: false,
  mxloading: false,
  maxloading: false,
  mmloading: false,
};

const homeReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actions.FETCH_BRANDS:
      return { ...state, brands: action.payload };

    case actions.FETCH_SECTION_PRODUCTS:
      switch (action.payload.type) {
        case "hot_products":
          return {
            ...state,
            hotProducts: action.payload.products,
            hloading: action.payload.loading,
          };

        case "popular_products":
          return {
            ...state,
            popularProducts: action.payload.products,
            ploading: action.payload.loading,
          };
        case "new":
          return {
            ...state,
            newProducts: action.payload.products,
            nloading: action.payload.loading,
          };
        case "recommended_products":
          return {
            ...state,
            recommendedProducts: action.payload.products,
            rloading: action.payload.loading,
          };
        case "max_price_million":
          return {
            ...state,
            maxPriceMillion: action.payload.products,
            mxloading: action.payload.loading,
          };

        case "max_price_half_million":
          return {
            ...state,
            maxPriceHalfMillion: action.payload.products,
            mmloading: action.payload.loading,
          };

        case "max_price_two_hundred_thousands":
          return {
            ...state,
            maxPriceTwoHundredThousands: action.payload.products,
            maxloading: action.payload.loading,
          };

        default:
          return state;
      }

    default:
      return state;
  }
};

export default homeReducer;

// max_price_half_million

// max_price_two_hundred_thousands
