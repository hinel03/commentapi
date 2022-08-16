const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const CommentController = require("../controllers/comments.controller");
const commentController = new CommentController();

router.get("/:postId", commentController.getComments);
router.post("/:postId", authMiddleware, commentController.createComment);
router.delete(
  "/:postId/:commentId",
  authMiddleware,
  commentController.deleteComment
);

module.exports = router;
