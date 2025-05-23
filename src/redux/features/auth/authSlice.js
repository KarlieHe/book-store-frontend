import { createSlice } from "@reduxjs/toolkit";

const storedAuth = localStorage.getItem("auth");
const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;

const initialState = {
  user: parsedAuth ? parsedAuth.user : null,
  token: parsedAuth ? parsedAuth.token : null,
  isAuthenticated: parsedAuth ? true : false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem("auth", JSON.stringify(action.payload));

        },
        clearCredentials: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("auth");

        },
    }
});

export const getCurrentUserAuth = (state) => 
    state.auth.isAuthenticated;

export const getCurrentUserRole = (state) => 
    state.auth.user.role;

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;