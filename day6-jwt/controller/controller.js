const jwt = require("../common/jwt");

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    
    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
            let token = jwt.jwtTokenGenerator({username:username});
            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token,
                user: "Admin"
            });
        } else {
            res.send(403).json({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    } else {
        res.send(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
};

function home(req, res) {
    res.json({
        success: true,
        message: 'Index page'
    });
}

module.exports = {
    home : home,
    login : login
}