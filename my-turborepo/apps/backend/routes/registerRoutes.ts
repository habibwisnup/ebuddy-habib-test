import { Router } from 'express';
import { registerUser } from '../controller/registerController';

const router = Router();

router.post('/register', registerUser); // Route untuk registrasi

export default router;
