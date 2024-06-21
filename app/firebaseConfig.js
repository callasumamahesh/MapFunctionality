// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAxEj0HMQoeLnJC0hR9WiBGolnEP7Xlobk",
  authDomain: "stup-7857c.firebaseapp.com",
  projectId: "stup-7857c",
  storageBucket: "stup-7857c.appspot.com",
  messagingSenderId: "875579690211",
  appId: "1:875579690211:web:7af3a4f0b27bc3980409d6",
  measurementId: "G-W08NCW8D4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db };


