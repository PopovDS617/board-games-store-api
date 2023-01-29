import { Router } from 'express';
import { getProducts, getSingleProduct } from '../controllers/products';

const router = Router();

router.route('/products').get(getProducts);
router.route('/products/:productId').get(getSingleProduct);

export default router;
