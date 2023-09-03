const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

// ROUTES
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const postRoutes = require("./routes/post");

const PORT = process.env.PORT || 8000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/social-posts";

mongoose
  .connect(MONGO_URI)
  .then(res => console.log("Database connected"))
  .catch(e => console.log(e.message));

// middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const isAuthenticated = require("./middlewares/checkAuth");

app.set("view engine", "ejs");

app.use("/user", userRoutes);

app.use(postRoutes);
app.use("/user", profileRoutes);

app.listen(PORT, console.log(`Server starter at port: ${PORT}`));
