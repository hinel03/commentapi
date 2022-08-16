/*const PostService = require("../services/posts.service");
const jwt = require("jsonwebtoken");

class PostsController {
  postService = new PostService();
  //게시글 전체 조회 API
  getAllPosts = async (req, res, next) => {
    const posts = await this.postService.findAllPost();
    res.status(200).json({ Post: posts });
  };
  //게시글 상세 조회 API
  getPost = async (req, res, next) => {
    const { postId } = req.params;

    const post = await this.postService.findPostById(postId);
    res.status(200).json({ post });
  };

  // 게시글 생성 API
  createPost = async (req, res, next) => {
    const tokenValue = req.cookies.token;
    const { userId, userName } = jwt.verify(tokenValue, "my-secret-key");
    const { title, body, Images } = req.body;
    const createPostData = await this.postService.createPost(
      userId,
      userName,
      title,
      body,
      Images
    );
    res.status(201).json({
      result: true,
      message: "게시글 작성에 성공하였습니다.",
    });
  };

  // 게시글 삭제 API
  deletePost = async (req, res, next) => {
    const tokenValue = req.cookies.token;
    const { userId, userName } = jwt.verify(tokenValue, "my-secret-key");
    const { postId } = req.params;
    const deletePost = await this.postService.deletePost(
      postId,
      userId,
      userName
    );
    if (deletePost === "NotaPost") {
      return res
        .status(400)
        .json({ result: false, message: "게시글이 존재하지 않습니다." });
    }
    if (deletePost === "NotaAuth") {
      return res
        .status(400)
        .json({ result: false, message: "게시글을 수정할 권한이 없습니다." });
    }
    res.status(200).json({ result: true, message: "게시글을 삭제하였습니다." });
  };
}
module.exports = PostsController;*/
