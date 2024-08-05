// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzRPsCCWV9Z47ov-tmMhB688aOGi8a_no",
  authDomain: "quiz-race-170f0.firebaseapp.com",
  projectId: "quiz-race-170f0",
  storageBucket: "quiz-race-170f0.appspot.com",
  messagingSenderId: "197638830458",
  appId: "1:197638830458:web:553ef6e6a99784ff2afec3",
  databaseURL: "https://quiz-race-170f0-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app)
