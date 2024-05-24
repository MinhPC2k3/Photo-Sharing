const express = require("express");
const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const User = require("../models/user");
const checkAuth = require("../middleware/checkAuth");
const uploadFileMiddleware = require("../middleware/imgMiddleware");
const router = express.Router();

router.post("/create", checkAuth, async (req, res) => {
  const { title, postPicture } = req.body;

  const findUser = await User.findOne({ _email: req.user });

  const newPost = await Post.create({
    authorFirstName: findUser.firstName,
    authorLastName: findUser.lastName,
    email: req.user,
    authorProfilePicture: findUser.profilePicture,
    title: title,
    date: Date.now(),
    postPicture: postPicture,
    likeNumber: 0,
  });

  res.status(200).json({ newPost });
});

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.status(200).json({posts:posts});
});


router.delete("/:postId1", checkAuth, async (req, res) => {
  const postId = req.params.postId1;
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ msg: "Post not found." });
  } else {
    await Post.findByIdAndDelete(postId); // Delete post
    res.status(200).json({ msg: "Post deleted." });
  }
});

module.exports = router;
