const { selectFields } = require("express-validator/src/select-fields");
const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default:"https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
  },
  gender:{
    type: String,
    default:0
  },
  phoneNumber:{
    type: String,
    require: true
  },
});

module.exports = mongoose.model("User", userSchema);

