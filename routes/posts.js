
const express = require("express");
const router = express.Router();

//미들웨어 임포트
const authMiddleware = require("../middlewares/auth-middleware");
const PostsController = require("../controllers/posts.controller"); // 컨트롤러 임포트
const postsController = new PostsController(); 

// 게시글 목록 조회
router.get("/", postsController.getAllPosts);
// 게시글 작성
router.post("/", authMiddleware, postsController.createNewPost);
//게시글 상세 조회
router.get("/:postId", postsController.getPostDetail);
//게시글 수정
router.put("/:postId", authMiddleware, postsController.updatePost);
//게시글 삭제
router.get(":/postId", authMiddleware, postController.deletePost);

module.exports = router;





//models에서 객체들 정보 작성 router은 각 기능을 컨트롤러에 어떤 이름으로 요청?할지 보낸다
