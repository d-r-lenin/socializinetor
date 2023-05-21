import axios from "axios";

import config from "../config/env.js";
const { umHost, host } = config;

const urls = {
    oneProfile: (name) => `${umHost}/profile/get/one?username=${name}`,
};

axios.defaults.withCredentials = true;

const exports = {};

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
