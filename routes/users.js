const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");
const usercontroller = new UserController();
const LoginController = require("../controllers/login.controller");
const LogoutController = require("../controllers/logout.controller");
const logincontroller = new LoginController();
const logoutcontroller = new LogoutController();
router.post("/user/signup", usercontroller.createUser);
router.post("/user/login", logincontroller.login);
router.get("/user/logout", logoutcontroller.logout);

module.exports = router;
