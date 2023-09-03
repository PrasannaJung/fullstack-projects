const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

const { createToken, verifyToken } = require("../services/jwtAuth");

async function createUser(req, res, next) {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName) throw new Error("Name field is required");
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(password, ":", hashedPassword);
    await User.create({
      email,
      fullName,
      password: hashedPassword,
    });
    return res.redirect("/user/login");
  } catch (e) {
    console.log(e.message);
    return res.render("signup", { error: e.message });
  }
}

async function authenticateUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User with the given email doesn't exist");
    }
    const hashedPassword = user.password;
    const passwordMatched = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatched) {
      throw new Error("Password is incorrect");
    }

    const tokenPayload = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    const token = await createToken(tokenPayload);

    const cookiesOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.cookie("token", token, cookiesOptions).redirect("/");
  } catch (e) {
    return res.render("login", { error: e.message });
  }
}

module.exports = {
  createUser,
  authenticateUser,
};
