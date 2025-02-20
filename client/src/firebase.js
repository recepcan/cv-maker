// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cv-maker-f261f.firebaseapp.com",
  projectId: "cv-maker-f261f",
  storageBucket: "cv-maker-f261f.firebasestorage.app",
  messagingSenderId: "566114089009",
  appId: "1:566114089009:web:c64b6f0c32e2520d70fd10"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);