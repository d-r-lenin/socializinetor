import axios from "axios";

import config from '../config/env.js';
const {
    umHost,
    host
} = config;

const urls = {
    ping : `${umHost}/user/ping`,
    login : `${umHost}/user/login`,
    signup : `${umHost}/user/create`,
    delete : `${umHost}/user/delete/me`,
}

axios.defaults.withCredentials = true;

const exports = {};

exports.pingUser = async () => {
    let res;
    try {
        res = await axios.get(urls.ping, {
            withCredentials: true
        });
        // console.log(res);
    } catch (err) {
        console.error(err);
    } finally {
        return res;
    }
}

exports.login = async (user) => {
    const options = {
        contentType: 'application/json',
    }
    const res = await axios.post(urls.login, user, options);
    return res;
}

exports.signup = async (user) => {
    const res = await axios.post(urls.signup, user);
    return res;
}

exports.deleteUser = async () => {
    const res = await axios.delete(urls.delete, {
        withCredentials: true
    });
    return res;
}


export default exports;
