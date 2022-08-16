const express = require("express");
const Posts = require("./posts");
const Comments = require("./comments");
const Users = require("./users");
const Logins = require("./login");
const router = express.Router();
router.use("/post/", [Posts]);
router.use("/comment/", [Comments]);
router.use("/user/", [Users]);
router.use("/login/", [Logins]);


module.exports = router;
