import { ExpressMiddleware } from '../types/express-types';
import Product from '../models/product';
import asyncHandler from 'express-async-handler';

// @desc    add a new product, only for admin
// @route   POST /admin/add-product
// @access  Private
export const addNewProduct: ExpressMiddleware = asyncHandler(
  async (req, res, next) => {
    const { title, description, price, imageUrl } = req.body;
    const product = await Product.create({
      title,
      description,
      price,
      imageUrl,
    });

    if (product) {
      res.status(201).json(product);
    } else {
      res.status(400);
      throw new Error('Invalid Product data');
    }
  }
);

// @desc    delete a new product, only for admin
// @route   DELETE /admin/delete-product
// @access  Private
export const deleteProduct: ExpressMiddleware = asyncHandler(
  async (req, res, next) => {
    const { productId } = req.body;

    try {
      const isProductDeleted = await Product.findByIdAndDelete({
        _id: productId,
      });
      if (isProductDeleted) {
        res.status(201).json({ message: 'deleted' });
      }
    } catch (err) {
      res.status(404);
      console.log(err);
    }
  }
);

// @desc    change/update product, only for admin
// @route   PATCH /admin/delete-product
// @access  Private
export const updateProduct: ExpressMiddleware = asyncHandler(
  async (req, res, next) => {
    const { title, description, price, imageUrl, productId } = req.body;
    try {
      const product = await Product.findOne({ _id: productId });
      if (!product) {
        res.status(404).json({ message: 'No product found' });
      }
    } catch (err) {
      res.status(404);
      console.log(err);
    }
  }
);
