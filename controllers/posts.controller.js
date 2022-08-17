const PostService = require("../services/posts.service");
const jwt = require("jsonwebtoken");
const CommentService = require("../services/comments.service");

class PostsController {
  postService = new PostService();
  commentService = new CommentService();
  //게시글 전체 조회 API
  getAllPosts = async (req, res, next) => {
    const posts = await this.postService.getAllPosts();
    res.status(200).json({ Post: posts });
  };
  //게시글 상세 조회 API
  getPost = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postService.getPost(postId);
    const Comments = await this.commentService.findComments(postId);
    res.status(200).json({ post, Comments });
  };

  // 게시글 생성 API
  createPost = async (req, res, next) => {
    // const tokenValue = req.cookies.token;
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
    const { user } = res.locals;

    const { postId } = req.params;
    const deleteComments = await this.commentService.deletedPost(postId);
    const deletePost = await this.postService.deletePost(
      postId,
      user.email,
      user.userName
    );

    res
      .status(200)
      .json({ success: true, message: "게시글을 삭제하였습니다." });
  };
  likePostStatus = async (req, res, next) => {
    const { user } = res.locals;
    const { postId } = req.params;

    const checkStatus = await this.postService.statusCheck(postId, user.userId);

    return checkStatus;
  };
  likePost = async (req, res, next) => {
    const { postId } = req.params;
    const { user } = res.locals;

    const checkStatus = await this.postService.statusCheck(postId, user.userId);

    if (checkStatus.result === false) {
      const createLikePostData = await this.postService.likePost(
        postId,
        user.userId
      );
      res.status(200).json(createLikePostData);
    } else {
      const updateLikePostData = await this.postService.dislikePost(
        postId,
        user.userId
      );
      res.status(200).json(updateLikePostData);
    }
  };
}
module.exports = PostsController;
