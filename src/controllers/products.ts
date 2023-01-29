import { ExpressController } from '../types/express-types';
import Product from '../models/product';
import asyncHandler from 'express-async-handler';

// @desc    get a list of all products
// @route   GET /products
// @access  Public
export const getProducts: ExpressController = asyncHandler(
  async (req, res, next) => {
    const products = await Product.find();
    console.log(products);
    if (products) {
      res.status(200).json({ products });
    } else {
      res.status(404);
      throw new Error('Products not found');
    }
  }
);

export const getSingleProduct: ExpressController = asyncHandler(
  async (req, res, next) => {
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });
    console.log(product);
    if (product) {
      res.status(200).json({ product });
    } else {
      const error = 'Product not found';
      res.status(404).json({ message: error });
      //next(error);
    }
  }
);
