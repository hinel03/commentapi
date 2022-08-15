const jwt = require("jsonwebtoken");
class LogoutController {
  logout = async (req, res, next) => {
    res.clearCookie("token");
    res.redirect("/");
  };
}
module.exports = LogoutController;
