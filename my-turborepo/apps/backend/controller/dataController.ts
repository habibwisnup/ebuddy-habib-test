import { Request, Response } from 'express';
import admin from '../config/firebaseConfig'; // Pastikan ini mengarah ke konfigurasi Firebase Admin
const db = admin.firestore(); // Inisialisasi Firestore

// Fungsi untuk menambahkan data ke Firestore
export const addData = async (req: Request, res: Response) => {
  const { title, description } = req.body; // Ambil data yang dikirimkan

  // Pastikan data yang diperlukan ada
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    // Menyimpan data ke koleksi 'data' di Firestore
    const docRef = await db.collection('data').add({
      title,
      description,
      createdAt: new Date(), // Timestamp
    });

    return res.status(201).json({ message: 'Data added successfully', id: docRef.id });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add data', error });
  }
};

// Fungsi untuk mengambil data dari Firestore
export const fetchData = async (req: Request, res: Response) => {
  try {
    // Mengambil semua dokumen dari koleksi 'data'
    const querySnapshot = await db.collection('data').get();

    if (querySnapshot.empty) {
      return res.status(404).json({ message: 'No data found' });
    }

    // Mengonversi dokumen menjadi array data
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch data', error });
  }
};
