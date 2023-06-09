const path = require('path');

const umhost = process.env.UMHOST || 'http://localhost:3000';
const origin = process.env.ORIGIN || 'http://localhost:5000';

module.exports = {
    umhost: umhost,
    origin: origin,
    
    withOrigin: (url) => path.join(origin, url),

    checkProfile: path.join(umhost, '/profile/check/availability'),
    
}