// import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../constants";

// const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// export const apiSlice = createApi({
//     baseQuery,
//     tagTypes: ["Product", "Order", "User", "Category"],
//     endpoints: () => ({}),
// });

//
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USERS_URL } from '../constants';
import { BASE_URL } from "../constants";


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            // Get the token from localStorage or wherever it’s stored
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({}), // define your endpoints here
});
