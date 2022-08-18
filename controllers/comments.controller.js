const CommentService = require("../services/comments.service");

class CommentController {
  CommentService = new CommentService();

  getComments = async (req, res, next) => {
    const { postId } = req.params;
    const comment = await this.CommentService.findComments(postId);

    res.status(200).json({ data: comment });
  };

  createComment = async (req, res, next) => {
    const { content } = req.body;
    const { postId } = req.params;
    const { user } = res.locals;

    const createCommentData = await this.CommentService.createComment(
      postId,
      user.userName,
      user.email,
      content
    );

    const comment = await this.CommentService.findComments(postId);
    if (createCommentData) {
      res.status(200).json({ result: true, comment });
    } else {
      res.status(400).json({ result: false });
    }
  };

  deleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { user } = res.locals;

    const result = await this.CommentService.deleteComment(
      commentId,
      user.email
    );

    if (result) {
      res.status(200).json({ result: true });
    }
  };

  deletedPost = async (req, res, next) => {
    const { postId, commentId } = req.params;

    const deleted = await this.CommentService.deletedPost(postId);

    if (deleted.result === true) {
      res.status(200).json({ deleted });
    } else {
      res.status(400).json({ deleted });
    }
  };
}

module.exports = CommentController;
