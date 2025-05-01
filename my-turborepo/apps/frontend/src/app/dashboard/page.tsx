"use client"; // Ensure the component is client-side

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation'; // Use next/navigation for client-side routing
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig'; // Ensure auth is correctly initialized

export default function Dashboard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [dataList, setDataList] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // For navigation

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const q = query(collection(db, 'data'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDataList(docs);
    } catch (err) {
      console.error('Error fetching data: ', err);
      setError('Failed to fetch data.');
    }
  };

  const handleAddOrUpdateData = async () => {
    if (!title || !description) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (isEditing && editId) {
        const docRef = doc(db, 'data', editId);
        await updateDoc(docRef, {
          title,
          description
        });
        setSuccessMessage('Data updated successfully!');
      } else {
        await addDoc(collection(db, 'data'), {
          title,
          description,
          createdAt: new Date(),
        });
        setSuccessMessage('Data added successfully!');
      }

      setTitle('');
      setDescription('');
      setEditId(null);
      setIsEditing(false);
      fetchData();
    } catch (error) {
      setError('Failed to save data.');
      console.error('Error saving document: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setTitle(item.title);
    setDescription(item.description);
    setIsEditing(true);
    setEditId(item.id);
    setSuccessMessage('');
    setError('');
  };

  const handleCancelEdit = () => {
    setTitle('');
    setDescription('');
    setIsEditing(false);
    setEditId(null);
    setSuccessMessage('');
    setError('');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase Auth
      router.push('/register'); // Redirect to the register page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Dashboard</h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: '#e74c3c',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}
      >
        Logout
      </button>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          {isEditing ? 'Edit Data' : 'Add New Data'}
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={handleAddOrUpdateData}
            disabled={loading}
            style={{
              backgroundColor: '#0070f3',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {isEditing ? 'Update Data' : 'Add Data'}
          </button>
          {isEditing && !loading && (
            <button
              onClick={handleCancelEdit}
              style={{
                backgroundColor: '#888',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          )}
        </div>
        {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green', marginTop: '0.5rem' }}>{successMessage}</p>}
      </div>

      <hr style={{ marginBottom: '1.5rem' }} />

      <div>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Data List</h2>
        {dataList.length === 0 ? (
          <p style={{ color: '#777' }}>No data found.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {dataList.map(item => (
              <li
                key={item.id}
                style={{
                  border: '1px solid #ddd',
                  padding: '1rem',
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <h3 style={{ margin: 0 }}>{item.title}</h3>
                <p style={{ margin: '0.5rem 0' }}>{item.description}</p>
                <small style={{ color: '#555' }}>
                  {item.createdAt?.seconds
                    ? new Date(item.createdAt.seconds * 1000).toLocaleString()
                    : 'No date'}
                </small>
                <div>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{
                      marginTop: '0.5rem',
                      padding: '5px 10px',
                      border: '1px solid #0070f3',
                      backgroundColor: '#0070f3',
                      color: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Spinner animation (only visible during loading, fullscreen overlay) */}
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              border: '6px solid #0070f3',
              borderTop: '6px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
