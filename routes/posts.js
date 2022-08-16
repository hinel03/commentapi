const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

router.get("/", postsController.getAllPosts);
router.get("/:postId", postsController.getPost);
router.post("/", authMiddleware, postsController.createPost);
router.delete("/:postId", authMiddleware, postsController.deletePost);

module.exports = router;
