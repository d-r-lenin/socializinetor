const profileApi = require('../APIs/profile.js');
const urls = require('../APIs/urls.js');

async function checkProfile(req, res, next) {
    try {
        const response = await profileApi.checkProfile(req.user.username);
        if (!response) {
            res.redirect(urls.withOrigin('/profile/create'));
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "somthing went wrong while checking profile",
            error: error.message
        })
        return false;
    }
}

module.exports = checkProfile;