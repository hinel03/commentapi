const { Comment } = require("../models");
const { Post } = require("../models");

class CommentRepository {
  findCommentById = async (postId) => {
    const comment = await Comment.findAll({ where: { postId } });
    return comment;
  };

  createComment = async (postId, userName, email, content) => {
    const selectedPost = await Post.findOne({ where: { postId } });
    if (!selectedPost) throw new Error("Post doesn't exist");

    const createCommentData = await Comment.create({
      postId,
      userName,
      email,
      content,
    });

    return createCommentData;
  };

  deleteComment = async (commentId, email) => {
    console.log("커멘드아이디", commentId);
    const selectedComment = await Comment.findOne({ where: { commentId } });
    console.log("댓글삭제테스트 오류", selectedComment);

    const updateCommentData = await Comment.destroy({ where: { commentId } });
    console.log("???", updateCommentData);
    return { result: true, Message: "댓글이 삭제되었습니다." };
  };

  deletedPost = async (postId) => {
    const selectedPost = await Post.findOne({
      where: { postId },
    });

    const updateCommentData = await Comment.destroy({ where: { postId } });

    return { result: true, Message: "댓글을 모두 삭제하였습니다." };
  };
}

module.exports = CommentRepository;
