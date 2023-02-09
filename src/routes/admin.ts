import { Router } from 'express';
import { addNewProduct, deleteProduct } from '../controllers/admin';
import { isAuth } from '../middleware/is-auth';

const router = Router();

router.route('/admin/add-product').post(addNewProduct);
router.route('/admin/delete-product').delete(isAuth, deleteProduct);

export default router;
