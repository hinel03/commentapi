const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const UserController = require("../controllers/users.controller");
const usercontroller = new UserController();

router.post('/user/signup', usercontroller.createUser);
=======
>>>>>>> 9f9b6750fc99ea3789b0352d138c61aaf5761de9
module.exports = router;