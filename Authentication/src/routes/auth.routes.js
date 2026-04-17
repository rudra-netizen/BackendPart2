const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const isUser = await userModel.findOne({
    username,
  });

  if (isUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const user = await userModel.create({
    username: username,
    password: password,
  });

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
  res.cookie("token", token);
  res.status(201).json({
    message: "User Registered Sucessfully",
    user,
    token,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const isUser = await userModel.findOne({
    username,
  });

  if (!isUser) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isPwdValid = isUser.password === password;

  if (!isPwdValid) {
    return res.status(400).json({
      message: "Password Invalid",
    });
  }

  const token = jwt.sign({ id: isUser._id }, process.env.SECRET_KEY);
  res.cookie("token", token);
  res.status(200).json({
    message: "User Logged In Sucessfully",
    user: isUser,
    token,
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "User Logged Out Sucessfully",
  });
});

router.get("/user", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userModel.findOne({
      _id: decoded.id,
    });
    return res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
});

module.exports = router;
