const jwt = require("../common/jwt");

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        
        let result = jwt.jwtTokenValidator(token);
        if (!result.success) {
            return res.json({
                success: false,
                message: 'Invalid Token.'
            });
        } else {
            req.decoded = result.decoded;
            next();
        }
    } else {
        return res.json({
            success: false,
            message: 'Token missing.'
        });
    }
};

module.exports = {
    checkToken: checkToken
}