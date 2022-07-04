import {httpGet} from "./index";

export const API_fetchFilters = (params) => httpGet({
    url: '/api/filter/options',
    params
})