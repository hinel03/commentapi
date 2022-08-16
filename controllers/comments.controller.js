const CommentService = require("../services/comments.service");

class CommentController {
  CommentService = new CommentService();

  getComments = async (req, res, next) => {
    const { postId } = req.params;
    const comment = await this.CommentService.findCommentById(postId);

    res.status(200).json({ data: comment });
  };

  createComment = async (req, res, next) => {
    const { content } = req.body;
    const { postId } = req.params;
    const { user } = res.locals;

    const createCommentData = this.CommentService.createComment(
      postId,
      user.nickname,
      user.email,
      content
    );

    if (createCommentData) {
      res.status(200).json({ result: true });
    } else {
      res.status(400).json({ result: false });
    }
  };

  deleteComment = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { user } = res.locals;

    const deleted = await this.CommentService.deleteComment(
      commentId,
      postId,
      commentId,
      user.email
    );

    if (!deleted) {
      res.status(200).json({ result: true });
    } else {
      res.status(400).json({ result: false });
    }
  };

  deletedPost = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { user } = res.locals;

    const deleted = await this.CommentService.deleteComment(
      commentId,
      postId,
      commentId,
      user.email
    );

    if (!deleted) {
      res.status(200).json({ result: true });
    } else {
      res.status(400).json({ result: false });
    }
  };
}

module.exports = CommentController;
