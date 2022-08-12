const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");
const usercontroller = new UserController();

router.post('/user/signup', usercontroller.createUser);
module.exports = router;