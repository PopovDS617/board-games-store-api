import { ExpressMiddleware } from '../types/express-types';
import Product from '../models/product';
import asyncHandler from 'express-async-handler';

// @desc    get a list of all products
// @route   GET /products
// @access  Public
export const getProducts: ExpressMiddleware = asyncHandler(
  async (req, res, next) => {
    const products = await Product.find();

    if (products) {
      res.status(200).json({ products });
    } else {
      const error = {
        statusCode: 404,
        message: 'product not found',
        data: null,
      };
      res.status(404).json({ error });
    }
  }
);

// @desc    get single product
// @route   GET /products/:productId
// @access  Public
export const getSingleProduct: ExpressMiddleware = asyncHandler(
  async (req, res, next) => {
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });

    if (product) {
      res.status(200).json({ product });
    } else {
      const error = 'Product not found';
      res.status(404).json({ message: error });
      //next(error);
    }
  }
);
