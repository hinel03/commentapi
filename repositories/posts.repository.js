const { Post } = require("../models");
const { Like } = require("../models");

class PostRepository {
  getAllPosts = async () => {
    const posts = await Post.findAll();
    return posts;
  };

  getPost = async (postId) => {
    const post = await Post.findByPk(postId);
    return post;
  };

  createPost = async (title, content, email, userName, Images) => {
    const createPostData = await Post.create({
      title,
      content,
      email,
      Images,
      userName,
    });

    return createPostData;
  };

  deletePost = async (postId) => {
    const deletePostData = await Post.destroy({ where: { postId: postId } });

    return deletePostData;
  };

  findStatus = async (postId, userId) => {
    const selectPost = await Like.findOne({ where: { postId, userId } });

    if (!selectPost) {
      return { isclick: false };
    } else {
      return { isclick: true };
    }
  };

  likePost = async (postId, userId) => {
    const detailpost = await Post.findOne({ where: { postId } });
    const likeSaved = detailpost.like;

    const likedpost = await Like.findOne({ where: { postId, userId } });

    if (detailpost) {
      if (!likedpost || !likedpost.length) {
        const likePostData = await Like.create({ userId, postId });
        const updated = await Post.update(
          { like: likeSaved + 1 },
          { where: { postId } }
        );
        return { liked: likeSaved + 1, isclick: true, result: true };
      } else {
        return { result: false, error: "이미 좋아요를 눌렀습니다." };
      }
    } else {
      return { result: false, error: "해당 게시글이 존재하지 않습니다." };
    }
  };

  dislikePost = async (postId, userId) => {
    const detailpost = await Post.findOne({ where: { postId } });
    const likeSaved = detailpost.like;

    const likedpost = await Like.findOne({ where: { postId, userId } });

    if (detailpost) {
      if (likedpost) {
        await Like.destroy({ where: { userId: userId, postId: postId } });
        const updated = await Post.update(
          { like: likeSaved - 1 },
          { where: { postId } }
        );
        return { liked: likeSaved - 1, isclick: false, result: true };
      } else {
        return { result: false, error: "좋아요를 누르지 않았습니다." };
      }
    } else {
      return { result: false, error: "해당 게시글이 존재하지 않습니다." };
    }
  };
}
module.exports = PostRepository;
