import { Request, Response } from 'express';
import { fetchUserData, updateUserData } from '../repository/userCollection';

export const getUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const user = await fetchUserData(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    await updateUserData(userId, userData);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};