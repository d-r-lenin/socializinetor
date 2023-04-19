const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const { getMaster } = require('../../configs/keys');

async function auth(req, res, next) {
    const token = req.cookies['sozi-x-auth-token'];
    console.log(req.cookies);
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const masterKey = await getMaster("MASTER_KEY");
        const decoded = jwt.verify(token, masterKey);
        req.user = decoded;
        console.log(decoded);
        next();
    }
    catch (err) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth;