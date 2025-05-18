import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCep4OnyTBP9tuneoTae9DeoghdCCzaZps",
  authDomain: "studybot-471ae.firebaseapp.com",
  projectId: "studybot-471ae",
  storageBucket: "studybot-471ae.firebasestorage.app",
  messagingSenderId: "231372392843",
  appId: "1:231372392843:web:6435d0258ac4a37849878e",
  measurementId: "G-EEDR5KF902"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Analytics only in browser environment
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, db, analytics };