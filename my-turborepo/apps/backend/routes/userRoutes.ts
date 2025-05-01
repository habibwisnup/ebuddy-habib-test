import { Router } from 'express';
import { updateUserData, fetchUserData } from '../controller/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { addData, fetchData } from '../controller/dataController';

const router = Router();

router.put('/user', authMiddleware, updateUserData); // Update user data
router.get('/user', authMiddleware, fetchUserData);  // Fetch user data

router.post('/data', authMiddleware, addData);  // Menambahkan data ke Firestore
router.get('/data', authMiddleware, fetchData);  // Mengambil data dari Firestore

export default router;
