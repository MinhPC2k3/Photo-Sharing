const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Comment = require("../db/comment");
const checkAuth = require("../middleware/checkAuth");
const User = require("../db/user");


//req.user
router.post(
  "/create",checkAuth,
  body("postId").isLength({ min: 1 }).withMessage("Invalid post Id."),
  body("body")
    .isLength({ min: 2 })
    .withMessage("Comment must be at least 2 characters long."),
  async (req, res) => {
    
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        errors: validationErrors.array().map((err) => {
          return err.msg;
        }),
        params: validationErrors.array().map((err) => {
          return err.param;
        }),
      });
    }
    const findUser = await User.findOne({ _email: req.user });
    const { postId, body } = req.body;

    const newComment = await Comment.create({
      postId: postId,
      authorFirstName: findUser.firstName,
      authorLastName: findUser.lastName,
      authorProfilePicture:findUser.profilePicture,
      body: body,
      date: Date.now(),
    });

    res.status(200).json({ comments:newComment });
  }
);

router.get("/:postId",checkAuth, async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comment.find().where("postId").equals(postId);
  res.status(200).json({comments:comments});
});

router.delete("/:commentId",checkAuth, async (req, res) => {
  const commentId = req.params.commentId;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ msg: "Comment not found." });
  } else {
    await Comment.findByIdAndDelete(commentId); // Delete comment
    res.status(200).json({ msg: "Comment deleted." });
  }
});

module.exports = router;
