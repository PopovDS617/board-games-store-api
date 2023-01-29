import { Router } from 'express';
import { getProducts } from '../controllers/products';

const router = Router();

router.route('/products').get(getProducts);

export default router;
