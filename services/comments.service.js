const comment = require("../models/comment");
const CommentRepository = require("../repositories/comments.repository");

class CommentService {
  CommentRepository = new CommentRepository();

  findComments = async (postId) => {
    const comments = await this.CommentRepository.findCommentById(postId);
    // return comments;
    return comments.map((comment) => {
      return {
        commentId: comment.commentId,
        userName: comment.userName,
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });
  };

  createComment = async (postId, nickname, email, content) => {
    const createCommentData = await this.CommentRepository.createComment(
      postId,
      nickname,
      email,
      content
    );

    return {
      commentId: createCommentData.null,
      nickname: createCommentData.nickname,
      content: createCommentData.content,
      postId: createCommentData.postId,
      createdAt: createCommentData.createdAt,
      updatedAt: createCommentData.updatedAt,
    };
  };

  deleteComment = async (commentId, email) => {
    const deleted = await this.CommentRepository.deleteComment(
      commentId,
      email
    );

    return deleted;
  };

  deletedPost = async (postId) => {
    const deleted = await this.CommentRepository.deletedPost(postId);

    return deleted;
  };
}

module.exports = CommentService;
