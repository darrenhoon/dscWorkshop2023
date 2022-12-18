const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const signup = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({message: "Invalid inputs passed, please check your data."});
    return;
  }

  console.log("At signup part. the email received is: ")
  console.log(req.body.email)

  const emailExists = await User.exists({ email: req.body.email });
  if (emailExists) {
    return res.status(400).json({message: "User already registered!"})
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch (err) {
    res
      .status(409)
      .json({message: "This account already exists (likely) or network issue (unlikely)."});
    return;
  }

  const createdUser = new User({
    email: req.body.email,
    password: hashedPassword,
  });

  let retrievedResult;
  try {
    retrievedResult = await createdUser.save();
  } catch (err) {
    res
      .status(503)
      .json({message: "Something went wrong while trying to sign up user. likely network error."});
    return;
  }

  res.status(201).send({message: "Your account has been created!\n"});
  return
};



const login = async (req, res, next) => {

  // console.log(req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({message: "Invalid inputs passed, please check your data."});
    return;
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email: req.body.email });
  } catch (err) {
    res
      .status(503)
      .json({message: "Login in failed, likely due to network error. Please try again later."});
    return;
  }

  if (!existingUser) {
    res.status(404).json({message: "No such account."});
    return;
  }

  try {
    comparisonResult = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
  } catch (error) {
    res.status(503).json({message: "Error hashing the password at login"});
    return;
  }

  if (!comparisonResult) {
    res.status(403).json({message: "Wrong Password"});
    return;
  }

  // console.log(existingUser)
  // console.log(process.env.JWT_KEY)
  let jwtToken;
  try {
    jwtToken = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email
      },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );
  } catch (err) {
    res
      .status(503)
      .json({
        message: "Something went wrong while trying create token for signed up user."
      });
    return;
  }


  // NOTE: DO NOT SEND THE user BACK TO THE FRONTEND IN A LIVE APPLICATION.
  // but for demonstration purposes it is here to show the decrypted JWT token will give you the information
  res.status(200).json({
    message: "Logged in!",
    user: existingUser,
    token: jwtToken,
  });
};

exports.signup = signup;
exports.login = login;
