const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
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
  email: {
    type: String,
    required: true,
    trim: true,
  },
  authorProfilePicture: {
    type: String,
    required: true,
    trim: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },
  // description: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  date: {
    type: Date,
    required: true,
  },
  postPicture: {
    type: String,
    required: true,
  },
  likeNumber:{
    type:Number,
    default:0,
  },
});

module.exports = mongoose.model("Post", postSchema);
