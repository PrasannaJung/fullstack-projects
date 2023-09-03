const router = require("express").Router();
const path = require("path");
const Post = require("../models/PostModel");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.get("/", async function (req, res) {
  const posts = await Post.find().populate("createdBy");
  console.log(posts);
  res.render("home", { posts });
});

router.post("/make", upload.single("postImg"), async (req, res) => {
  console.log("Inside making post");
  console.log(req.body);
  console.log(req.file);

  try {
    const post = await Post.create({
      imageUrl: "/uploads/" + req.file.filename,
      title: req.body.title,
      body: req.body.caption,
      createdBy: req.user ? req.user._id : "64ed86807809d4967399a6b4",
    });
    res.redirect("/");
  } catch (e) {
    console.log(e.message);
    res.redirect("/");
  }
});

module.exports = router;
