const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../../models/user');
const Profile = require('../../models/profile');
const { getMaster } = require('../../configs/keys');

router.get('/test/register', async (req, res) => {
    const masterKey = await getMaster("MASTER_KEY");
    const user = new User({
        username: "test1",
        password: "test1",
        email: "test@richardlenin.com"
    });
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = jwt.sign({ username: user.username }, masterKey);

    // set http-only cookie
    res.cookie(
        'x-auth-token', 
        token, 
        { httpOnly: true }
    ).send(token);
});


router.get('/test/login', async (req, res) => {
    const masterKey = await getMaster("MASTER_KEY");
    const user = await User.findOne({ username: "test1" });
    if (!user) return res.status(400).send('Invalid username or password.');

    const validPassword = await bcrypt.compare("test1", user.password);
    if (!validPassword) return res.status(400).send('Invalid username or password.');

    // create profile for test
    // const profile = new Profile({
    //     username: user.username,
    //     name: "Test User",
    //     bio: "This is a test user."
    // });

    // await profile.save();

    const token = jwt.sign({ username: user.username }, masterKey);
    res.cookie(
        'sozi-x-auth-token',
        token, 
        { httpOnly: true }
    ).send(token);
});

module.exports = router;