const { User }  = require("../models")
class userRepository {
    createUser = async(email, userName, password, passwordCheck) => {
        console.log("3",email,userName,password,passwordCheck);
        const users = await User.create({email, userName, password, passwordCheck});
        console.log('4');
        return users;
    };
    findOneUser = async(email) => {
        const user = await User.findOne({where : {email}});
        console.log("!!!!!!!!!!!",user);
        return user;
    };
};
module.exports = userRepository
