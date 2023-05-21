// create slice for user auth
import { createSlice } from '@reduxjs/toolkit'

import userApi from '../APIs/auth'

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuth: false,
        isLoading: false,
        error: null,
        isLoggedIn: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
            state.isLoading = false;
            state.isLoggedIn = true;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isAuth = false;
            state.isLoading = false;
        },
        changeLoginStatus: (state) => {
            state.isLoggedIn = true;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure, logout, changeLoginStatus } = authSlice.actions;

export const login = async (user, dispatch) => {
    try {
        const res = await userApi.login(user);
        if (res.data && res.data.error) {
            return dispatch(loginFailure(res.data.error));
        }
        if(res.data && res.data.user) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            dispatch(loginSuccess(res.data.user));
        }
    } catch (err) {
        console.log(err);
        dispatch(loginFailure(err.message));
    }
};

export const register = async (user, dispatch) => {
    try {
        const res = await userApi.signup(user);
        console.log(res)
        if (res.data && res.data.error) {
             return dispatch(loginFailure(res.data.error));
         }
         if (res.data && res.data.user) {
             localStorage.setItem("user", res.data.user);
             dispatch(loginSuccess(res.data.user));
         }
        dispatch(loginSuccess(res.data));
    } catch (err) {
        console.log(err.response.data)
        if (err.code === "ERR_BAD_REQUEST") {
            return dispatch(loginFailure(JSON.stringify(err.response.data.error)));
        }
        dispatch(loginFailure(err.message));
    }
};

export const isUserLoggedIn = async (dispatch) => {
    try {
        const res = await userApi.pingUser();
        if (res.data && res.data.status === 200) {
            console.log(res.data)
            dispatch(changeLoginStatus());
        }
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

export const logoutUser = async (dispatch) => {
    localStorage.removeItem("user");
    dispatch(logout());
};

export const selectUser = (state) => state.auth.user;
export const selectIsAuth = (state) => state.auth.isAuth;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;


export default authSlice.reducer;
