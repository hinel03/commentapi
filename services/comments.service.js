const comment = require("../models/comment");
const CommentRepository = require("../repositories/comments.repository");

class CommentService {
  CommentRepository = new CommentRepository();

  findCommentById = async (postId) => {
    const comments = await this.CommentRepository.findCommentById(postId);

    return comments.map((comment) => {
      return {
        commentId: comment.null,
        nickname: comment.nickname,
        content: comment.poastId,
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

  deleteComment = async (postId, commentId) => {
    const deleted = await this.CommentRepository.deleteComment(
      postId,
      commentId
    );

    return deleted;
  };

  deletedPost = async (postId, commentId) => {
    const deleted = await this.CommentRepository.deleteComment(
      postId,
      commentId
    );

    return deleted;
  };
}

module.exports = CommentService;
