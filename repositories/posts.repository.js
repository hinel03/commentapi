const { Post } = require("../models");
const { Likey } = require("../models");

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
    console.log(Images);
    const createPostData = await Post.create({
      title,
      content,
      email,
      Images,
      userName,
    });
    console.log(createPostData);
    return createPostData;
  };

  deletePost = async (postId) => {
    const deletePostData = await Post.destroy({ where: { postId: postId } });

    return deletePostData;
  };
}
module.exports = PostRepository;
