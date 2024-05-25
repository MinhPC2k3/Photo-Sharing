const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/checkAuth");
const User = require("../db/user");
var bodyParser = require('body-parser')

const router = express.Router();
router.use(bodyParser.json())

router.post(
  "/signup",
  body("firstName").notEmpty().withMessage("First name is invalid."),
  body("lastName").notEmpty().withMessage("Last name is invalid."),
  body("email").isEmail().withMessage("Email is invalid."),
  body("password").isLength({ min: 4 }).withMessage("Password is invalid."),
  body("confirmPassword").custom((value, { req }) => value === req.body.password).withMessage("Confirm password does not match."),
  body("phoneNumber").notEmpty().withMessage("Phone number is invalid."),
  body("gender").notEmpty().withMessage("Gender is required."),
  async function (req, res) {
        /* Throw errors if validation errors */
        console.log(req.body)
        const {
          firstName,
          lastName,
          email,
          password,
          profilePicture,
          gender,
          phoneNumber,
        } = req.body;
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
    
    if (req.body.password !== req.body.confirmPassword){
      return res.status(400).json({
        errors: "Confirm password is incorrect.",
      });
    }
    const findUser = await User.findOne({ email: email });

    if (findUser) {
      return res.status(401).json({
        errors: "Email already exists.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      profilePicture: profilePicture,
      gender: gender,
      phoneNumber: phoneNumber,
    });

    // const token = await jwt.sign(
    //   { email: newUser.email },
    //   `${process.env.JWT_SECRET_KEY}`,
    //   {
    //     expiresIn: "1h",
    //   }
    // );
    // res.setHeader("authorization",token)
    res.status(200).json({
      // token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        gender: newUser.gender,
        profilePicture: newUser.profilePicture,
      },
    });
  }
);
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    return res.status(401).json({
      errors: "Email is not registered.",
    });
  }
  console.log(email,findUser)
  const isMatch = await bcrypt.compare(password, findUser.password);

  if (!isMatch) {
    return res.status(400).json({
      errors: "Password is incorrect.",
    });
  }

  const token = await jwt.sign(
    { email: findUser.email },
    `${process.env.JWT_SECRET_KEY}`,
    {
      expiresIn: "1h",
    }
  );

  res.setHeader("authorization",token)
  res.status(200).json({
    // token,
    user: {
      token:token,
      id: findUser._id,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      email: findUser.email,
      profilePicture: findUser.profilePicture,
      phoneNumber: findUser.phoneNumber,
    },
  });
});
router.get("/me", checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user });
  res.status(200).json({
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
    },
  });
});

router.put(
  "/:user",checkAuth,
  body("firstName").isLength({ min: 3 }).withMessage("First name is invalid."),
  body("lastName").isLength({ min: 3 }).withMessage("Last name is invalid."),
  body("email").isEmail().withMessage("Email is invalid."),
  body("oldPassword")
    .isLength({ min: 6 })
    .withMessage("Old Password is invalid."),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New Password is invalid."),
  body("profilePicture")
    .isLength({ min: 10 })
    .withMessage("Could not upload image."),
  async (req, res) => {
    /* Throw errors if validation errors */
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
    if (req.body.password !== req.body.confirmPassword){
      return res.status(400).json({
        errors: ["Confirm password is incorrect."],
      });
    }
    // let { user } = req.params;
    // user = user.split("=")[1];

    let findUser = await User.findOne({ _id: req.params.user });

    const {
      firstName,
      lastName,
      email,
      oldPassword,
      newPassword,
      profilePicture,
      phoneNumber,
      gender,
    } = req.body;

    const isMatch = await bcrypt.compare(oldPassword, findUser.password);

    if (!isMatch) {
      return res.status(400).json({
        errors: ["Old Password is incorrect."],
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    findUser = await User.findByIdAndUpdate(
      { _id: req.params.user },
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        profilePicture: profilePicture,
        phoneNumber: phoneNumber,
        gender: gender,
      }
    );

    const updatedUser = await User.findById({ _id: req.params.user }).select("-password");

    res.json({ updatedUser });
  }
);

router.get("/users", checkAuth,async (req, res) => {
  const users = await User.find({}, "-password");
  return res.json(users);
});
// router.post('/', (req, res) => {
// 	uploadSingleImage(req, res, function (err) {
// 		if (err) {
// 			res.status(400).send({ message: err.message });
// 		}

// 		res.status(200).send({
// 			message: 'Image uploaded successfully',
// 			image: /${req.file.path.replace(/\\/g, '/')},
// 		});
// 	});
// });
module.exports = router;
