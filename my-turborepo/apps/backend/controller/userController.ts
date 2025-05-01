import { Request, Response } from 'express';
import admin from '../config/firebaseConfig'; // Pastikan ini mengarah ke konfigurasi Firebase Admin

const db = admin.firestore();

interface UserData {
  name: string;
  email: string;
  age?: number;
}

// ✅ Update user data
export const updateUserData = async (req: Request, res: Response) => {
  const { name, email, age } = req.body;
  const uid = (req as any).user?.uid;

  if (!uid) {
    return res.status(401).json({ message: 'Unauthorized: UID not found' });
  }

  try {
    const userRef = db.collection('users').doc(uid); // Konsisten gunakan 'users' (lowercase)
    await userRef.set({ name, email, age }, { merge: true });

    return res.status(200).json({ message: 'User updated' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update user', error });
  }
};

// ✅ Fetch user data
// Fetch user data
export const fetchUserData = async (req: Request, res: Response) => {
    const uid = (req as any).user?.uid;
  
    if (!uid) {
      return res.status(401).json({ message: 'Unauthorized: UID not found' });
    }
  
    try {
      const doc = await db.collection('users').doc(uid).get(); // Harus cocok dengan koleksi 'users'
      
      if (!doc.exists) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json(doc.data());
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch user data', error });
    }
  };
  
