import { Router } from 'express';
import { login, signup, logout } from '../controllers/auth';

const router = Router();

router.route('/auth/login').post(login);
router.route('/auth/signup').post(signup);
router.route('/auth/logout').post(logout);

export default router;
