const { User }  = require("../models");
class userRepository {
    createUser = async(email, userName, password, passwordCheck) => {
        const users = await User.create({email,userNae,password,passwordCheck});
        return users;
    };
    findOneUser = async(email) => {
        const user = await User.findOne({where:email});
        return user;
    };
};
module.exports = userRepository
