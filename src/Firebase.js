// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyByxrZStoNo6fTPhzOf5vPgkLJLCNleScw",
  authDomain: "school-project-acad9.firebaseapp.com",
  projectId: "school-project-acad9",
  storageBucket: "school-project-acad9.appspot.com",
  messagingSenderId: "587382680253",
  appId: "1:587382680253:web:c84f6650d4a431688fe5d4",
  measurementId: "G-T8MS7C1GQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);