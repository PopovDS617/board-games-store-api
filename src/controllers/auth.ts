import { ExpressMiddleware } from '../types/express-types';
import User from '../models/user';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generate-token';

export const onSignup: ExpressMiddleware = asyncHandler(
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
    });

    if (user) {
      res.status(201).json({
        message: 'ok',
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  }
);

export const onLogin: ExpressMiddleware = asyncHandler(
  async (req, res, next) => {
    const email = req.body.email;
    const enteredPassword = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('no user with this email');
    }

    const isPasswordValid = await bcrypt.compare(
      enteredPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error('wrong password');
    }
    if (user && isPasswordValid) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id.toString()),
      });
    }
  }
);
