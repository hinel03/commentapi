const PostService = require("../services.posts.service");

//post의 컨트롤러 역할을 하는 클래스
class PostController {
    postService= new PostService(); //post 서비스 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다

    // 게시글 전체 조회
    getAllposts = async (req, res, next) => {
        //서비스에게 getAllposts 요청을 보낸다
        try{
            const posts = await this.postService.getAllposts();

            return res.status(200).json({ result: true });
        } catch(error){
            res.status(400).send({ error: "네트워크 에러" });
        }
    };

    //게시글 작성 
    createNewPost = async (req, res, next) => {
        try {    
          const { user } = await res.locals;
          const images = await req.files.uploadFile;
          images.mv('./uploads/' + images.name);

          console.log(user);
          const { title, content } = req.body;
          // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
    
          const { message } = await this.postService.createNewPost(
            user,
            title,
            content,
            images,
          );
          return res.status(201).json({ message });
        } catch (error) {
          console.log(message); 
          return res.status(400).send({ error: "네트워크 에러" });
        }
      };
    
      //게시글 상세조회
      getPostDetail = async (req, res,next) => {
        try{
            const { postId }=req.params;
            if(!Number.isInteger(Number(postId))){
                next();
                return;
            }
            const data = await this.postService.getPostDetail(postId);
            return res.status(200).json({ data: data});
        }catch(error){
            const message = `${req.methiod} ${req.originalUrl} : ${error.message}`;
            return res.status(400).send({ message });
        }
      };

      //게시글 삭제
      deletePost = async (req, res, next) => {
        try {
            const { user } = res.locals;
            const { postId } = req.params;

            if(!Number.isInteger(Number(postId))) {
                next();
                return;
            }

            const post = await this.postService.deletePost()
            return res.status(200).json({ data: postId})
        }catch(error){
            return res.status(400).json({ error: "네트워크 에러" });
        }
      };
}

module.exports = PostController;
