const util = require("util");
const path = require("path");
const multer = require("multer");

const staticPath = path.resolve();
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(staticPath, "/static"));
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;