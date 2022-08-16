const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

router.get("/post", postsController.getAllPosts);
router.get("/post/:postId", postsController.getPost);
router.post("/post", authMiddleware, postsController.createPost);
router.delete("/post/:postId", authMiddleware, postsController.deletePost);

module.exports = router;
