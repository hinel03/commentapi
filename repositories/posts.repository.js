const { Post } = require("../models");
const Sequelize = require("sequelize");

class PostRepository {
    //postId를 받아 게시글 1개의 정보를 반환한다
    getPost = async(postId)=>{
        const thisPost = await Post.findOne({postId: postId });
        return thisPost;
    }

    //게시글 전체 조회
    getAllposts = async (orderBy = "DESC") => {
        const allPosts = await Post.findAll({
            order: [["createAt", orderBy]],
        });

        return allPosts;
    };

    //게시글 작성
    creatreNewPost = async(userId, nickname, title, email, images, content) => {
        const createPost = await Post.create({
            userId,
            nickname,
            email,
            title,
            images,
            content,
        });

        return createPost;
    };



    // 전달된 postId에 해당하는 게시글을 삭제한. returns 삭제한 게시글정보
    deletePost = async (postId) => {
    console.log("****** --- PostRepository.deletePost ---");
    const deletedPost = await Post.destroy({ where: { id: postId } });

    console.log("****** --- PostRepository.deletePost Returns ---");
    return deletedPost;
    };
}
