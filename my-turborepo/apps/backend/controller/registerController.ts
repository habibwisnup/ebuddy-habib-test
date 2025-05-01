import { Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Create a new user
    const userRecord = await getAuth().createUser({
      email,
      password,
    });

    res.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};
