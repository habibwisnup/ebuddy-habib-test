import { db } from '../config/firebaseConfig';
import { User } from '../entities/user';

const userCollection = db.collection('USERS');

export const fetchUserData = async (userId: string): Promise<User | null> => {
  const userDoc = await userCollection.doc(userId).get();
  if (!userDoc.exists) {
    return null;
  }
  return { id: userDoc.id, ...userDoc.data() } as User;
};

export const updateUserData = async (userId: string, userData: Partial<User>): Promise<void> => {
  await userCollection.doc(userId).update(userData);
};