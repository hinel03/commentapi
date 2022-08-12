const UserService = require("../services/users.service");
const { User } = require("../models");
class UserController {
    userService = new UserService();

    createUser = async(req,res,next) => {
        const {email, userName, password, passwordCheck} = req.body;
        const tokenValue = req.cookies.token;
        const existUser = await this.userService.findOneUser({email});
        let emailtest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!emailtest.test(email)) {
            return res.status(400).json({
                result:false,
                errorMessage: "이메일 양식이 올바르지 않습니다."
            });
        }
        
        //유효성 검사
        if(password.length < 4) {
            return res.status(400).json({
                result: false,
                errorMessage: "비밀번호는 최소 4자리 이상이어야 합니다."
            });
        }
        if(password !== passwordCheck) {
            return res.status(400).json({
                result: false,
                errorMessage: "비밀번호와 확인 비밀번호가 일치하지 않습니다."
            });
        }
        if(existUser) {
            return res.status(400).json({
                result: false,
                errorMessage: "중복된 이메일입니다. 다른 이메일을 입력하십시오"
            });
        }
        if(tokenValue){
            return res.status(400).json({
                result: false,
                errorMessage: "로그인된 상태에서는 회원가입을 할 수 없습니다",
            });
        }
        
        //유효성 검사를 통과
        await this.userService.createUser({email,userName, password, passwordCheck});
        return res.status(400).json({
            result: true,
            Message: "회원가입에 성공하셨습니다."
        });


    };
};

module.exports = UserController;