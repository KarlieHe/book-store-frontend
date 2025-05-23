import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
console.log("API URL:", import.meta.env.VITE_API_URL);
const baseQuery = fetchBaseQuery({
    
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = JSON.parse(localStorage.getItem("auth"))?.token;
        if(token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        Headers.set('Content-Type', 'application/json');
        Headers.set('Access-Control-Allow-Origin', 'http://localhost:5173'); 
        return Headers;
    }
})

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Books', 'User', 'Orders'],
    endpoints: () => ({ })
})