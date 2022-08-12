const express = require("express");
const router = express.Router();
const { User }  = ("../models");
const UserController = require("../controllers/users.controller");
const usercontroller = new UserController();

router.get('/user/signup', usercontroller.createUser);
router.get('/user/login', usercontroller);

module.exports = router;