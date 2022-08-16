const LoginService = require("../services/login.service");
const jwt = require("jsonwebtoken");
class LoginController {
  loginService = new LoginService();

  // 로그인 API
  login = async (req, res, next) => {
    if (req.cookies.token) {
      res.status(402).json({
        result: false,
        error: "이미 로그인이 되어있습니다",
      });
      return;
    }

    const { email, password } = req.body;
    const user = await this.loginService.login(email, password);

    if (!user) {
      res.status(400).json({
        result: false,
        error: "이메일 또는 패스워드가 일치하지 않습니다.",
      });
      return;
    }
    console.log(user);
    let payload = { email: user.email, userName: user.userName };
    const token = jwt.sign(payload, process.env.MYSQL_KEY);
    res.cookie("token", token);
    return res.status(200).json({
      result: true,
      email: user.email,
      userName: user.userName,
    });
  };
}
module.exports = LoginController;
