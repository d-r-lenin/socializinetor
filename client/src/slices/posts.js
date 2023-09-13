import { createSlice } from "@reduxjs/toolkit";

import postApi from "../APIs/post";

export const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        postsRender: {},
        isLoading: false,
        error: null,
    },
    reducers: {
        getPostsStart: (state) => {
            state.isLoading = true;
        },
        getPostsSuccess: (state, action) => {
            state.posts = action.payload;
            state.isLoading = false;
        },
        getPostsFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        renderedPost: (state, action) => {
            state.postsRender[action.payload.id] = action.payload;
        },
    },
});

export const getPosts = async (dispatch) => {
    try {
        const res = await postApi.getPosts();
        if (res.data && res.data.posts) {
            dispatch(getPostsSuccess(res.data.posts));
        } else {
            dispatch(getPostsFailure("No posts found"));
        }
    } catch (err) {
        console.log(err);
        dispatch(getPostsFailure(err.message));
    }
};

export const getPostOfId = async (id, dispatch) => {
    try {
        dispatch(
            renderedPost({
                id: id,
                isLoading: true,
                post: null,
            })
        );
        const res = await postApi.getPostOfId(id);
            // console.log(res)
        if (res.data && res.data['_id']) {
            res.data.isLoading = false;
            res.data.id = id;
            const user = localStorage.getItem('user');
            console.log(user)
            if(res.data.likes.includes(user)) {
                res.data.isLiked = true;
            } else {
                res.data.isLiked = false;
            }
            dispatch(renderedPost(res.data));
        } else {
            dispatch(
                renderedPost({
                    id: id,
                    error: "Post not available",
                    isLoading: false,
                })
            );
        }
    } catch (err) {
        console.log(err);
        dispatch(
            renderedPost({
                id:id,
                error: err.message,
                isLoading: false,
            })
        );
    }
};

export const likePost = async (id, dispatch) => {
    try {
        const res = await postApi.likePost(id);
        if (res.data && res.data['_id']) {
            res.data.isLoading = false;
            res.data.id = id;
            res.data.isLiked = true;
            dispatch(renderedPost(res.data));
        }
    } catch (err) {
        console.log(err);
    }
};

export const unlikePost = async (id, dispatch) => {
    try {
        const res = await postApi.unlikePost(id);
        if (res.data && res.data['_id']) {
            res.data.isLoading = false;
            res.data.id = id;
            res.data.isLiked = false;
            dispatch(renderedPost(res.data));
        }
    } catch (err) {
        console.log(err);
    }
};

// Action creators are generated for each case reducer function
export const { getPostsStart, getPostsSuccess, getPostsFailure, renderedPost } = postSlice.actions;

export default postSlice.reducer;
