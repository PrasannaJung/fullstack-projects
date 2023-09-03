const Post = require("../models/PostModel");

async function createPost(req, res) {
  const body = req.body;
  console.log(body);
  return res.redirect("/");
}

module.exports = {
  createPost,
};
