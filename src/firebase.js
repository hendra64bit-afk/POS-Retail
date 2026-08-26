import { initializeApp } from 'firebase/app';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

// TODO: Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb5dTChjr3xPARzqpznzPSnWnc96-JAOI",
  authDomain: "pos-reatil.firebaseapp.com",
  projectId: "pos-reatil",
  storageBucket: "pos-reatil.firebasestorage.app",
  messagingSenderId: "414536091628",
  appId: "1:414536091628:web:5f81ffde6ade3cb45562c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with offline persistence
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});
