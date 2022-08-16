const postRepository = require("../repositories/posts.repository");

class PostService {
  postRepository = new postRepository();
  //게시글 전체 조회

  getAllPosts = async () => {
    const allPost = await this.postRepository.getAllPosts();

    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    console.log("test");
    return allPost.map((post) => {
      return {
        postId: post.postId,
        email: post.email,
        userName: post.userName,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likes: post.like,
        Images: post.Images,
      };
    });
  };
  //게시글 상세 조회
  getPost = async (postId) => {
    const post = await this.postRepository.getPost(postId);

    return {
      postId: post.postId,
      email: post.email,
      userName: post.userName,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      likes: post.like,
      Images: post.Images,
    };
  };
  //게시글 작성
  createPost = async (title, content, email, userName, Images) => {
    console.log(Images);
    const createPostData = await this.postRepository.createPost(
      title,
      content,
      email,
      userName,
      Images
    );

    return {
      postId: createPostData.id,
      nickname: createPostData.nickname,
      userId: createPostData.userId,
      title: createPostData.title,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
      likes: createPostData.like,
    };
  };

  //게시글 삭제
  deletePost = async (postId) => {
    const findPost = await this.postRepository.getPost(postId);

    await this.postRepository.deletePost(postId);

    return {
      postId: findPost.postId,
      userName: findPost.userName,
      title: findPost.title,
      content: findPost.content,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
      likes: findPost.like,
    };
  };

  statusCheck = async (postId,userId) =>{
    const result = await this.postRepository.findStatus(postId,userId);
    return result;
  }

  likePost = async (postId, userId) => {
    const createLikePostData = await this.postRepository.likePost(
      postId,
      userId,
    );

   return createLikePostData;
  };

  dislikePost = async (postId, userId) => {
    const updateLikePost = await this.postRepository.dislikePost(
      postId,
      userId
    );

    return updateLikePost;
  };
}
module.exports = PostService;
