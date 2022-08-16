const { Comments } = require("../models");
const { Posts } = require("../models");

class CommentRepository {
  findCommentById = async (postId) => {
    const comment = await Comments.findAll(
      { order: [["createdAt", "DESC"]] },
      { where: { postId } }
    );
    return comment;
  };

  createComment = async (postId, nickname, email, content) => {
    const selectedPost = await Posts.findOne({ where: { postId } });
    if (!selectedPost) throw new Error("Post doesn't exist");

    const createCommentData = await Comments.create({
      postId,
      nickname,
      email,
      content,
    });

    return createCommentData;
  };

  deleteComment = async (postId, commentId) => {
    const selectedComment = await Comments.findOne({ commentId });
    const selectedPostId = postId;
    const selectedPost = await Posts.findOne({ selectedPostId });

    if (!selectedComment) throw new Error("Comment doesn't exist");

    const updateCommentData = await Comment.destroy({ where: { commentId } });

    return updateCommentData;
  };

  deletedPost = async (postId, commentId) => {
    const selectedPostId = postId;
    const selectedPost = await Posts.findOne({ selectedPostId });

    if (!selectedPost) throw new Error("Comment doesn't exist");

    const updateCommentData = await Comments.destroyAll({ where: { postId } });

    return updateCommentData;
  };
}

module.exports = CommentRepository;
