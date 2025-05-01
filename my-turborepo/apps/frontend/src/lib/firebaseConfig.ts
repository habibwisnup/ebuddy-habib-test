  // lib/firebaseConfig.ts
  import { initializeApp, getApps, getApp } from 'firebase/app';
  import { getAuth } from 'firebase/auth';
  import { getFirestore } from 'firebase/firestore';  // Import Firestore

  const firebaseConfig = {
    apiKey: "AIzaSyCSLn8_WgZ75m3-pswg84LXiVfZ6iI9-Zc",
    authDomain: "monorepo-e77e0.firebaseapp.com",
    projectId: "monorepo-e77e0",
    storageBucket: "monorepo-e77e0.firebasestorage.app",
    messagingSenderId: "569333286745",
    appId: "1:569333286745:web:266ce09d336a8c10f0ae48",
    measurementId: "G-PYPRE7W7H4"
  };

  // Initialize Firebase app
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

  // Initialize Firebase Auth
  const auth = getAuth(app);

  // Initialize Firestore
  const db = getFirestore(app);  // Inisialisasi Firestore

  // Export auth and db
  export { auth, db };
