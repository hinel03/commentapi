const userRepository = require("../repositories/users.repository");

class UserService {
    userrepository = new userRepository();
    createUser = async(email, userName, password, passwordCheck) => {
        
        const createUserData = await this.userrepository.createUser(email, userName, password, passwordCheck);
  
    };
    findOneUser = async(email) => {
        const findUserData = await this.userrepository.findOneUser(email);
        if(findUserData){
            return {
                email : findUserData.email,
            }
        }
        else {
            return ;
        }
    };
};
module.exports = UserService;