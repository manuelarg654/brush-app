import 'firebase/firestore';
import 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDU-C5_MHnBYIBW0Z7M_haIeUbl5m42JO8",
  authDomain: "english-reviewer-f77ee.firebaseapp.com",
  projectId: "english-reviewer-f77ee",
  storageBucket: "english-reviewer-f77ee.appspot.com",
  messagingSenderId: "1032334716652",
  appId: "1:1032334716652:web:1542b36b93b5ed288cbfc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();


export {
  db,
  googleAuthProvider
} 