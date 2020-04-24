const express = require("express");
const bodyParser = require("body-parser");
const routers = require("../router/router");
const cors = require('cors')

function server() {
  let app = express(); // Export app for other routes to use
  const port = process.env.PORT || 8000;
  app.use(cors())
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