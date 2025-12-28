// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsE1pFseWBP2d0wjGMKD-fpQP2GBF1M5o",
  authDomain: "kognisia-3c58d.firebaseapp.com",
  databaseURL: "https://kognisia-3c58d-default-rtdb.firebaseio.com",
  projectId: "kognisia-3c58d",
  storageBucket: "kognisia-3c58d.firebasestorage.app",
  messagingSenderId: "78716684682",
  appId: "1:78716684682:web:e88872798faeeb99772073",
  measurementId: "G-FYV55W5PB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, analytics, database };

