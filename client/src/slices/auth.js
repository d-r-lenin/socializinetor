// create slice for user auth
import { createSlice } from "@reduxjs/toolkit";

import userApi from "../APIs/auth";
import profileApi from "../APIs/profile";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuth: false,
        isLoading: true,
        isProfileExist: false,
        isProfileLoading: true,
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
        resetError: (state) => {
            state.error = null;
        },
        checkProfileStart: (state) => {
            state.isProfileLoading = true;
        },
        checkProfileSuccess: (state) => {
            state.isProfileExist = true;
            state.isProfileLoading = false;
        },
        checkProfileFailure: (state) => {
            state.isProfileExist = false;
            state.isProfileLoading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    changeLoginStatus,
    resetError,
    checkProfileSuccess,
    checkProfileFailure,
    checkProfileStart
} = authSlice.actions;

export const login = async (user, dispatch) => {
    try {
        const res = await userApi.login(user);
        if (res.data && res.data.error) {
            return dispatch(loginFailure(res.data.error));
        }
        if (res.data && res.data.user) {
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
        console.log(res);
        if (res.data && res.data.error) {
            return dispatch(loginFailure(res.data.error));
        }
        if (res.data && res.data.user) {
            localStorage.setItem("user", res.data.user);
            dispatch(loginSuccess(res.data.user));
        }
        dispatch(loginSuccess(res.data));
    } catch (err) {
        console.log(err.response.data);
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
            console.log(res.data);
            dispatch(changeLoginStatus());
        } else {
            return dispatch(loginFailure(res.data.error));
        }
        return res.data;
    } catch (err) { 
        console.error(err);
        dispatch(loginFailure(err.message || "Something went wrong!"));
    }
};

export const checkProfile = async (dispatch) => {
    try {
        const res = await profileApi.getMyProfile();
        console.log(res);
        if (res.data && res.data.status === 200) {
            dispatch(checkProfileSuccess());
        } else {
            dispatch(checkProfileFailure());
        }
    } catch (err) {
        console.error(err);
        dispatch(checkProfileFailure());
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
