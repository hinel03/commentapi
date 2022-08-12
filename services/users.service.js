const userRepository = require("../repositories/users.repository");

class UserService {
    userrepository = new userRepository();
    createUser = async(email, userName, password, passwordCheck) => {
        const createUserData = await this.userrepository.createUser(email, userName, password, passwordCheck);
        return {
            email : createUserData.email,
            userName : createUserData.userName,
            password : createUserData.password,
            passwordCheck : createUserData.passwordCheck,
        };
    };
    findOneUser = async(email) => {
        const findUserData = await this.userrepository.findOneUser(email);
        return {
            email : findUserData.email,
        }
    };
};
module.exports = UserService;