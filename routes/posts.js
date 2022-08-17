const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

const CommentController = require("../controllers/comments.controller");
const commentController = new CommentController();

router.get("/", postsController.getAllPosts);
router.get("/:postId", postsController.getPost, commentController.getComments);
router.post("/", authMiddleware, postsController.createPost);
router.delete("/:postId", authMiddleware, postsController.deletePost);
router.post("/:postId/like", authMiddleware, postsController.likePost);

module.exports = router;
