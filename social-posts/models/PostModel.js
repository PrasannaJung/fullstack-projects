const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  imageUrl: String,
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
