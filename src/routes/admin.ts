import { Router } from 'express';
import { addNewProduct, deleteProduct } from '../controllers/admin';

const router = Router();

router.route('/admin/add-product').post(addNewProduct);
router.route('/admin/delete-product').delete(deleteProduct);

export default router;
