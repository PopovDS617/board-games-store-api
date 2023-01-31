import { Router } from 'express';
import { onLogin, onSignup } from '../controllers/auth';

const router = Router();

router.route('/auth/login').post(onLogin);
router.route('/auth/signup').post(onSignup);

export default router;
