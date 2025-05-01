import admin from 'firebase-admin';
import serviceAccount from './monorepo-e77e0-firebase-adminsdk-fbsvc-824a22f687.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export default admin;
const db = admin.firestore(); 
export { db };
