import jwt from "jsonwebtoken";

import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign(
    { id },
    "cyberyaansecret",
    {
      expiresIn: "30d",
    }
  );
};

// REGISTER USER
export const registerUser = async (
  req,
  res
) => {
  try {
    let {
      name,
      email,
      password,
    } = req.body;

    // Normalize email
    email = email
      .toLowerCase()
      .trim();

    // Check existing user
    const userExists =
      await User.findOne({
        email,
      });

    if (userExists) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    // Create user
    const user =
      await User.create({
        name,
        email,
        password,
      });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token:
        generateToken(
          user._id
        ),
    });

  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// LOGIN USER
export const loginUser = async (
  req,
  res
) => {
  try {
    let {
      email,
      password,
    } = req.body;

    // Normalize email
    email = email
      .toLowerCase()
      .trim();

    // Find user
    const user =
      await User.findOne({
        email,
      });

    // Check password
    if (
      user &&
      user.password === password
    ) {

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token:
          generateToken(
            user._id
          ),
      });

    } else {

      res.status(401).json({
        message:
          "Invalid credentials",
      });
    }

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });
  }
};