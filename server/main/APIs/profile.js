const axios = require('axios');

const urls = require('./urls');

module.exports.checkProfile = async (username) => {
    try {
        const response = await axios.get(urls.checkProfile, {
            username: username
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}
