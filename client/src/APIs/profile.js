import axios from "axios";

import config from "../config/env.js";
const { umHost, host } = config;

const urls = {
  oneProfile: (name) => `${umHost}/profile/get/one?username=${name}`,
  myProfile: () => `${umHost}/profile/check/availability`,
  createProfile: () => `${umHost}/profile/create`,
  displayPicture: (id) => `${umHost}/profile//media/display/${id}`,
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

        let profile = res.data.profile;
        if (profile) {
            profile.display = urls.displayPicture(profile.display["$oid"]);
        }

        res.data = profile;
    } catch (err) {
        console.error(err);
    } finally {
        console.log(res);
        return res;
    }
};


export default exports;
