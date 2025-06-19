import { apiSlice } from '../apiSlice';
import { setCredentials, clearCredentials } from './authSlice';


export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/users/register",
                method: "POST",
                body: userData,
            })
        }),

        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/users/login",
                method: "POST",
                body: credentials,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {

                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials(data));
                } catch (error) {
                    console.error("Failed to register user", error);
                }
            }
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: "/users/logout",
                method: "POST",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(clearCredentials());
            }
        }),

        getUser: builder.query({
            query: () => ({
                url: "/users/me",
                method: "GET",
            }),
            providesTags: ["User"], // Revalidate when updated
        }),

        updateUser: builder.mutation({
            query: (userData) => ({
                url: "/users/me",
                method: "PUT",
                body: userData,
            }),
            invalidatesTags: ["User"], // Revalidate when updated
        }),

        updatePassword: builder.mutation({
            query: (data) => ({
                url: "/users/me/password",
                method: "PUT",
                body: data,
            }),
        }),
    })
})


export const { 
    useRegisterUserMutation, 
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetUserQuery,
    useUpdateUserMutation,
    useUpdatePasswordMutation
} = authApi;












