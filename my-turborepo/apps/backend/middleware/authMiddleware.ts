import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Ambil token dari header Authorization

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token); // Verifikasi token
    (req as any).user = decodedToken; // Simpan user data dalam req.user
    next(); // Lanjutkan ke middleware berikutnya
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', error });
  }
};

