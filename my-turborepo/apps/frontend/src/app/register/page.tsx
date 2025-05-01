"use client";

import { useState } from 'react';
import { auth } from '../../lib/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', userCredential.user);
      alert('Registration successful!');
      router.push('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleGoToLogin = () => {
    router.push('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Register</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>

        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleGoToLogin} style={styles.linkButton}>
            Already have an account? Go to Login
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    boxSizing: 'border-box',
  },
  title: {
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    textAlign: 'center',
    color: '#111827',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  linkButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#6b7280',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
};
