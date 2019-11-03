const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
const controller = require("../controller/controller");

router.get("/",middleware.checkToken,controller.home);
router.post("/login",controller.login);


module.exports = router;