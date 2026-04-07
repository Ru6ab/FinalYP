// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "final-yp-cdbef.firebaseapp.com",
  projectId: "final-yp-cdbef",
  storageBucket: "final-yp-cdbef.firebasestorage.app",
  messagingSenderId: "911625450296",
  appId: "1:911625450296:web:2b6a2b3422b31f8ced07cd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);