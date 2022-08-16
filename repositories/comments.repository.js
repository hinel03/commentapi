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
    const selectedComment = await Comment.findOne({ commentId });
    console.log(selectedComment);

    if(!selectedComment.length){
        return { result: false, Error:"해당 댓글이 존재하지 않습니다." };
    }

    if (email !== selectedComment.email){
        return { result: false, Error:"본인 작성 댓글이 아닙니다." };
    }

    const updateCommentData = await Comment.destroy({ where: { commentId } });

    return {result:true, Message: "댓글이 삭제되었습니다."};
  };

  deletedPost = async (postId) => {
    const selectedPostId = postId;
    const selectedPost = await Post.findOne({ selectedPostId });

    if (!selectedPost.length) throw new Error("게시글이 존재하지 않습니다.");
   
    const updateCommentData = await Comment.destroyAll({ where: { postId } });

    return {result:true, Message:"댓글을 모두 삭제하였습니다."};
  };
}

module.exports = CommentRepository;
