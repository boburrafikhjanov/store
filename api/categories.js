import { httpGet, httpPost } from "./index";

export const API_fetchCategories = () =>
   httpGet({
      url: "/api/categories",
   });

// Fetch products in catalog, it uses filters by pagination, price, brands and product features
export const API_filter_category_products = (params) =>
   httpGet({
      url: "/api/products",
      params: {
         page: 1,
         per_page: 24,
         ...params,
      },
   });
