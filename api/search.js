import {httpGet} from "./index";

export const API_Search = (search) => httpGet({
    url: '/api/search',
    params: {
        search,
        shop: 1
    }
})