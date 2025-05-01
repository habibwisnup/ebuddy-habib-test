import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import admin from 'firebase-admin';
import serviceAccount from './config/monorepo-e77e0-firebase-adminsdk-fbsvc-824a22f687.json';
import registerRoutes from './routes/registerRoutes';

// Inisialisasi Firebase admin jika belum
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const app = express();
app.use(cors());
app.use(express.json());

// Default root route untuk hindari 404 saat akses "/"
app.get('/', (req, res) => {
  res.send('Backend is running and Firebase initialized!');
});

// Gunakan route untuk user
app.use('/api', userRoutes);
app.use('/api', registerRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
