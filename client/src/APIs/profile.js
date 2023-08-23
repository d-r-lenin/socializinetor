import axios from "axios";

import config from "../config/env.js";
const { umHost, host } = config;

const urls = {
    oneProfile: (name) => `${umHost}/profile/get/one?username=${name}`,
    myProfile: () => `${umHost}/profile/check/availability`,
    createProfile: () => `${umHost}/profile/create`,
};

const exports = {
    urls,
};

exports.createProfile = async (formData, config) => {
    let res;
    try {
        res = await axios.post(urls.createProfile(), formData, config);
    } catch (err) {
        console.error(err);
    } finally {
        console.log(res);
        return res;
    }
};

exports.getMyProfile = async () => {
    let res;
    try {
        res = await axios.get(urls.myProfile());
    } catch (err) {
        console.error(err);
    } finally {
        console.log(res);
        return res;
    }
};

exports.getOneProfile = async (name) => {
    let res;
    try {
        res = await axios.get(urls.oneProfile(name));
    } catch (err) {
        console.error(err);
    } finally {
        console.log(res);
        return res;
    }
};


export default exports;
