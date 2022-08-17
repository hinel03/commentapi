const LoginRepository = require("../repositories/login.repository");

class LoginService {
  loginrepository = new LoginRepository();

  login = async (email, password) => {
    const UserData = await this.loginrepository.login(email, password);
    if (UserData) {
      return {
        userId: UserData.userId,
        email: UserData.email,
        password: UserData.password,
        userName: UserData.userName,
      };
    } else {
      return;
    }
  };
}
module.exports = LoginService;
