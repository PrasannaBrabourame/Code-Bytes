**

> JWT (JSON Web Token)

**
JWT authentication is becoming very popular these days. JWT is a type of token-based authentication. For every single request from a client to the server, a token is passed for authentication. It supports the stateless API calls.

![image](https://user-images.githubusercontent.com/25142868/68082005-07460400-fe3d-11e9-9b34-431224f82031.png)

> **We can summarise above picture into following points:**

- A client sends username/password combination to the server
- The server validates the authentication
- If authentication is successful, the server creates a JWT token else establishes an error response
- On successful authentication, the client gets JWT token in the response body
- Client stores that token in local storage or session storage.
- From next time, the client for making any request supplies the JWT token in request headers like this. Authorization: Bearer <jwt_token>
- Server upon receiving the JWT validates it and sends the successful response else error.

> **Developing the sample application**

Let us start with the package.json. We need the following libraries in our app.

- Express JS — For serving requests
- jsonwebtoken — For writing and verifying JWT tokens

```

{
  "name": "day6-jwt",
  "version": "1.0.0",
  "description": "Prototype of integrating nodejs apps with jwt",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"node main.js"
  },
  "keywords": [
    "jwt",
    "node",
    "auth"
  ],
  "author": "sakthivel p",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1"
  },
  "devDependencies": {
    "eslint": "^6.6.0",
    "eslint-config-standard": "^14.1.0",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-standard": "^4.0.1",
    "eslint-plugin-node": "^10.0.0",
    "eslint-plugin-promise": "^4.2.1"
  }
}
```

>  **Now do**

`npm install
`

**We need to create a few more files for our project as shown in below image**

![image](https://user-images.githubusercontent.com/25142868/68082185-7f152e00-fe3f-11e9-8af9-03c5d5064c94.png)

> **Now let us add our config code in config.js**

```
module.exports = {
    secret : 'secretKeyHide'
};
```
> **Now let us add our jwt code in jwt.js**

```
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
```
> **Now let us add our code in controller.js**

```
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
                token: token
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
```
> **Now let us add our code in middleware.js**

```
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
```
> **Now let us add our code in router.js**

```
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
const controller = require("../controller/controller");

router.get("/",middleware.checkToken,controller.home);
router.post("/login",controller.login);


module.exports = router;
```
> **Now let us add our code in server.js**

```
const express = require("express");
const bodyParser = require("body-parser");
const routers = require("../router/router");


function server() {
  let app = express(); // Export app for other routes to use
  const port = process.env.PORT || 8000;
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(routers);
  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

module.exports={
    server : server
}
```
> **Now let us add our code in main.js**

```
const server = require("./server/server");

server.server();
```

> **Let us run this app and see what we got here. Open a terminal and run this.**

`node server.js // starts server on 8000 port
`

> **Now try to make a postman request.**

**Calling http://localhost:8000 without token**
![image](https://user-images.githubusercontent.com/25142868/68082390-0794ce00-fe42-11e9-8255-74036a65a4f4.png)

**Calling http://localhost:8000/login**
![image](https://user-images.githubusercontent.com/25142868/68082417-593d5880-fe42-11e9-8fa5-278ed334663e.png)

**Calling http://localhost:8000 with token generated while login**
![image](https://user-images.githubusercontent.com/25142868/68082470-36f80a80-fe43-11e9-9ca0-5408dd8cfffe.png)

**

> In the above Example, we are doing the following things:

**

- Capture headers with names ‘x-access-token’ or ‘Authorization.’
- If the header is in ‘Authorization: Bearer xxxx…’ format, strip unwanted prefix before token.
- Using jwt package and secret string, validate the token.
- If anything goes wrong, return an error immediately before passing control to next handler.
- Export the middleware function for other modules to use.

I hope this article can help you to integrate JWT into your NodeJS REST API.
