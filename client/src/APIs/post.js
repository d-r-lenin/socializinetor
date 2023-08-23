import axios from "axios";

import config from "../config/env.js";
const { umHost, host } = config;

const urls = {
    post: `${host}/api/post`,
    media: `${host}/api/post/media`,
    like: (id) => `${host}/api/post/${id}/like`,
    unlike: (id) => `${host}/api/post/${id}/unlike`,
};

axios.defaults.withCredentials = true;

const exports = {};

exports.getPosts = async () => {
    let res;
    try {
        // with query params
        res = await axios.get(urls.post, {
            params: {
                page: 1,
                limit: 20,
            },
        });

        console.log(res.data)
    } catch (err) {
        console.error(err);
    } finally {
        return res;
    }
};

exports.getPostOfId = async (id) => {
    let res;
    try {
        res = await axios.get(`${urls.post}/${id}`);
    } catch (err) {
        console.error(err);
    } finally {
        return res;
    }
}


exports.likePost = async (id) => {
    let res;
    try {
        // ignore error from api like 404 or 400 etc.
        res = await axios.patch(urls.like(id), {}, { validateStatus: () => true });
    } catch (err) {
        console.error(err);
    } finally {
        return res;
    }
}

exports.unlikePost = async (id) => {
    let res;
    try {
        res = await axios.patch(urls.unlike(id));
    } catch (err) {
        console.error(err);
    } finally {
        return res
    }
}


exports.getMediaLink = (id) => {
    return `${urls.media}/${id}`;
}



export default exports;