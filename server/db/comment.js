const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  postId: {
    type: String,
    required: true,
    trim: true,
  },
  authorFirstName: {
    type: String,
    required: true,
    trim: true,
  },
  authorLastName: {
    type: String,
    required: true,
    trim: true,
  },
  authorProfilePicture: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
