const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
// const profileRoutes = require("./routes/profile");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comment");
const path = require("path");
const multer = require("multer");
const cors = require("cors");


require("dotenv").config();

const app = express();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/ /g, '')
    cb(null, new Date().toISOString() + "-" + fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    // str = str.replace(/\s/g, '');
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(express.json());
app.use(cors());
// var corsOptions = {
//   origin: "http://localhost:8080"
// };

// app.use(cors(corsOptions));

const port = process.env.PORT || 8080;
app.use("/upload",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("file"),(req, res, next) => {
    const file = req.file
    console.log("Doing 2")
    if (!file) {
      console.log("Doing 1")
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    console.log("Doing 3")
    console.log(file.path.replace(/ /g, ''))
    console.log(file.path)
    res.send(file.path)
  }
);
app.use("/auth", authRoutes);
// app.use("/profile", profileRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

const staticPath = path.resolve(); // Set __dirname to the current directory

app.use("/static", express.static(path.join(staticPath, "/static")));

mongoose
  .connect(
    "mongodb+srv://congminhptit0511:12345@mernprojectdb.hwvegaj.mongodb.net/?retryWrites=true&w=majority&appName=MernProjectDB"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(port, () => {
      console.log(`Node API app is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
// app.listen(port, () => {

//   mongoose.connect("mongodb+srv://congminhptit0511:12345@mernprojectdb.hwvegaj.mongodb.net/?retryWrites=true&w=majority&appName=MernProjectDB",)
//     .then(() => {
//       app.use("/auth", authRoutes);
//       // app.use("/profile", profileRoutes);
//       app.use("/posts", postRoutes);
//       app.use("/comments", commentRoutes);
//     })
//     // http:::localhost:8080/posts
//     .catch((err) => {
//       console.log(err);
//     });
// });
// console.log("Server is running on port " + port);
