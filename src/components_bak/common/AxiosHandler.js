/**
 * axios - request method
 * GET : axios.get(url[, config])
 * POST : axios.post(url, data[, config])
 * PUT : axios.put(url, data[, config])
 * DELETE : axios.delete(url[, config])
 * 
 * axios - basic param
 * method, url, data(optional), params(optional)
 */

import axios from "axios";

// 1. Get Data --> INFO
export function Get(url, params) {
    axios.get(
        url,
        {params}
    )
    // .then(function(res) {
    //     // success case
    //     return res.json();
    // })
    .then( (Response) => {
        console.log("axios.GET : ", Response.data);
        return Response.data;
    })
    .catch(function(e) {
        return e;
    })
}