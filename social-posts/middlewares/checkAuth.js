const { verifyToken } = require("../services/jwtAuth");

async function isAuthenticated(req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    return res.redirect("/user/login");
  }

  console.log("Inside auth checking");

  try {
    const payload = verifyToken(token);
    if (!payload) {
      return res.redirect("/user/login");
    }
    req.user = payload;
    return next();
  } catch (e) {
    console.log(e.message);
    return res.redirect("/user/login");
  }
}

module.exports = isAuthenticated;
