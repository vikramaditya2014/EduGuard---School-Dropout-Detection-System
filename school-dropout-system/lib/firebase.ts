import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBMuLnUpjiFvEk0qdcLWeRSHAt3N5DcHyQ",
  authDomain: "stock2-94141.firebaseapp.com",
  projectId: "stock2-94141",
  storageBucket: "stock2-94141.firebasestorage.app",
  messagingSenderId: "94693209403",
  appId: "1:94693209403:web:bc03a61b1c24d00d40f31e",
  measurementId: "G-XJXFQGGYHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;