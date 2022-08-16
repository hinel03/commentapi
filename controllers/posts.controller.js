const PostService = require("../services/posts.service");
const jwt = require("jsonwebtoken");

class PostsController {
  postService = new PostService();
  //게시글 전체 조회 API
  getAllPosts = async (req, res, next) => {
    const posts = await this.postService.getAllPosts();
    res.status(200).json({ Post: posts });
  };
  //게시글 상세 조회 API
  getPost = async (req, res, next) => {
    const { postId } = req.params;

    const post = await this.postService.getPost(postId);
    res.status(200).json(post);
  };

  // 게시글 생성 API
  createPost = async (req, res, next) => {
    const tokenValue = req.cookies.token;
    const { user } = res.locals;
    const { title, content, Images } = req.body;

    const createPostData = await this.postService.createPost(
      title,
      content,
      user.email,
      user.userName,
      Images
    );
    res.status(201).json({
      result: true,
    });
  };

  // 게시글 삭제 API
  deletePost = async (req, res, next) => {
    const tokenValue = req.cookies.token;
    const { email, userName } = jwt.verify(tokenValue, "my-secret-key");
    const { postId } = req.params;
    const deletePost = await this.postService.deletePost(
      postId,
      email,
      userName
    );

    res
      .status(200)
      .json({ success: true, message: "게시글을 삭제하였습니다." });
  };
}
module.exports = PostsController;
