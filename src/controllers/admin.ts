import { ExpressMiddleware } from '../types/express-types';
import Product from '../models/product';
import asyncHandler from 'express-async-handler';

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

export const deleteProduct: ExpressMiddleware = asyncHandler(
  async (req, res, next) => {
    const { productId } = req.body;
    try {
      const isProductDeleted = await Product.deleteOne({ _id: productId });
      if (isProductDeleted) {
        res.status(201).json({ message: 'deleted' });
      }
    } catch (err) {
      res.status(404);
      console.log(err);
    }
  }
);
