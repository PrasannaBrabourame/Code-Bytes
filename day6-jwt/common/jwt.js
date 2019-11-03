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
    let result = undefined;
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            result= {
                success: false,
                message: 'Invalid Token.'
            };
        } else {
            result = {
                decoded: decoded,
                success: true
            };
        }
    });
    return result;
}