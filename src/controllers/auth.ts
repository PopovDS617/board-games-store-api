import { ExpressMiddleware } from '../types/express-types';
import User from '../models/user';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generate-token';
import { IUser } from '../types/model-types';

// @desc    sign up
// @route   POST /auth/signup
// @access  Public
export const signup: ExpressMiddleware = asyncHandler(
  async (req, res, next) => {
    //  const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   const error = new Error('Validation failed.');
    //   error.statusCode = 422;
    //  error.data = errors.array();
    //   throw error;
    //  }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email: email,
      password: hashedPassword,
      name: name,
      isAdmin: false,
      token: null,
    });

    if (user) {
      res.status(201).json({
        message: 'ok',
        // _id: user._id,
        // name: user.name,
        // email: user.email,
        // isAdmin: user.isAdmin,
        // token: user.token,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  }
);

// @desc    login
// @route   POST /auth/login
// @access  Public
export const login: ExpressMiddleware = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const enteredPassword = req.body.password;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(enteredPassword, user.password);
  if (!isPasswordValid) {
    throw new Error('Wrong password');
  }
  if (user && isPasswordValid) {
    const token = generateToken(user._id.toString());

    user.token = token;
    const updateUser = await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  }
});

// @desc    login
// @route   POST /auth/logout
// @access  Private
export const logout: ExpressMiddleware = asyncHandler(
  async (req, res, next) => {
    const { userId } = req.body;

    const user = await User.findByIdAndUpdate({ _id: userId }, { token: null });

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    if (user) {
      res.status(200).json({ message: 'succesfully logged out' });
    }
  }
);
