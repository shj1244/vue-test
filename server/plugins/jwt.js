
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');
const crypto = require('crypto');

const { SECRET_KEY } = siteConfig;
//console.log('SECRET_KEY',SECRET_KEY)

const options = {
    algorithm: 'HS256',
    issuer: 'ezcode',
    //expiresIn : '30m'
}


const token = {
    getRandToken(len = 64) {
        return randToken.generate(len);
    },
    generatePassword(password) {
        return crypto.pbkdf2Sync(password, siteConfig.SECRET_KEY, 10, 64, 'sha512').toString('base64');
    },
    getToken(user) {
        const payload = {
            mb_id: user.mb_id
        };
        return jwt.sign(payload, siteConfig.SECRET_KEY, options);
    },
    verify(token) {
        try {
            return jwt.verify(token, siteConfig.SECRET_KEY);
        } catch (e) {
            return { err: e.message };
        }
    }
};

module.exports = token;