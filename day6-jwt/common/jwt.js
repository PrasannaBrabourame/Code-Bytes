let jwt = require('jsonwebtoken');
let config = require('./config');

exports.jwtTokenGenerator = (payload) => {
    return jwt.sign(
        payload,
        config.secret, {
            expiresIn: '24h' // expires in 24 hours
        }
    );
}

exports.jwtTokenValidator = (token) => {
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length); // Remove Bearer from string
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return {
                success: false,
                message: 'Invalid Token.'
            };
        } else {
            return {
                decoded: decoded,
                success: true
            };
        }
    });
}