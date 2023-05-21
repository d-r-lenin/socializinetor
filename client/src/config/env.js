let env = 'dev';

// user management host
let umHost = {
    dev: 'http://localhost:4000',
    prod: 'https://socializinator.richardlenin.com'
}

// main backend host
let host = {
    dev: 'http://localhost:3000',
    prod: 'https://socializinator.richardlenin.com'
}


const config = {
    env,
    umHost: umHost[env],
    host: host[env]
};


export default config;
