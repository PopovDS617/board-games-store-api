import { ExpressController } from '../types/express-types';

// @desc    get a list of all products
// @route   GET /products
// @access  Public
export const getProducts: ExpressController = (req, res, next) => {
  res.status(200).json({
    products: [{ title: 'first product', content: 'This is the 1st product' }],
  });
};
