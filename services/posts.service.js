const PostRepository = require("../repositories/posts.repository");
const UserRepository = require("../repositories/users.repository");

class PostService {
    postRepository = new PostRepository();
    UserRepository = new UserRepository();

    //게시글 목록 조회
    getAllPosts = async() => {
        const dataAll = await this.postRepository.getAllPosts("DESC");

        // dataAll 하나씩 돌면서 리턴 필요한 요소들만 찾아 resultData완성
        const resultData = dataAll.map((el) => {
            return {
                postId:el.id,
                userName:el.userName,
                title:el.title,
                createdAt:el.createdAt,
                updateAt:el.updatetAt,
            };
        });
        return resultData;
    };

    //게시글 작성
    createNewPost = async(user, title, email, body, images) => {

        const { images } = {
            name: images.name,
            minetype: images.minetype,
            size: images.size,
        }

        await this.postRepository.createNewPost(
            user.userName,
            title,
            email,
            body,
            images,
        );

        return { result: true};
    };

    //게시글 상세조회
    getPostDetail = async(postId)=> {
        const thisPost = await this.postRepository.getPost(postId);

        if(!thisPost){
            return { message: "해당 게시글이 없습니다."};
        }else{
            return {
                postId: thisPost.id,
                email:thisPost.email,
                userName: thisPost.userName,
                images: thisPost.images,
                title: thisPost.title,
                body: thisPost.body,
                createdAt: thisPost.createdAt,
                updatedAt: thisPost.updatedAt,
            }
        }
    };



    //게시글 삭제
    deletePost = async(user, postId) => {
        const thisPost =await this.postRepository.getPost(postId);

        if(!thisPost){
            return { status: 400, message: "해당 게시글이 없습니다." };
        } else if(user.nickname != thisPost.nickname){
            return { status: 400, message: "해당 권한이 없습니다." };
        } else{
            await this.postRepository.deletePost(postId);
            return { status: 200, result: true};
        }
    };
}
