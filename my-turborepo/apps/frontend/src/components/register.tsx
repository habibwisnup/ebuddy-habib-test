"use client";

import { useState } from 'react';
import { auth, db } from '../lib/firebaseConfig'; // db = getFirestore(app)
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
  
      // Tambahkan data user ke Firestore
      await setDoc(doc(db, 'users', uid), {
        name,
        email,
        createdAt: new Date()
      });
  
      console.log('User registered and saved to Firestore.');
    } catch (error) {
      setError('Registration failed.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
