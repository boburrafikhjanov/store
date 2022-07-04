import {httpGet, httpPost} from "./index";

export const API_FetchFavourites = (page) => httpGet({
   url: '/api/user/favorites',
   params: {
      per_page: 10,
      page
   }
})


export const API_ToggleFavourite = (product_id) => httpPost({
   url: "/api/user/favorites/toggle",
   data: {
      product_id
   }
})