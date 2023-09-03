const router = require("express").Router();
const isAuthenticated = require("../middlewares/checkAuth");

const userController = require("../controllers/user");

router.get("/signup", function (req, res) {
  return res.render("signup");
});

router.post("/signup", userController.createUser);

router.get("/login", function (req, res) {
  return res.render("login");
});

router.post("/login", userController.authenticateUser);

router.get("/create-post", function (req, res) {
  return res.render("createPost");
});

module.exports = router;
