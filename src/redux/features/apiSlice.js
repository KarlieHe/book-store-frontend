import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clearCredentials } from './auth/authSlice';
import { toast, Bounce } from 'react-toastify';
// import { clearCredentials } from './auth/authSlice'; // Adjust the import path as necessary

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
        // Headers.set('Access-Control-Allow-Origin', 'http://localhost:5173'); 
        return Headers;
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
  
    if (result.error?.status === 401 && result.error?.data?.message === "Token expired") {
      api.dispatch(clearCredentials());
    //   Show a toast notification
      toast.warning("Your session expired. Please login again.", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      

    }
  
    return result;
  };

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Books', 'User', 'Orders'],
    endpoints: () => ({ })
})