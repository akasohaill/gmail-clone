// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDiUSCAEaTC-1GRSXAWvF2A-f2Zm40Q0kU",
  authDomain: "clone-d9bab.firebaseapp.com",
  projectId: "clone-d9bab",
  storageBucket: "clone-d9bab.appspot.com",
  messagingSenderId: "880870901904",
  appId: "1:880870901904:web:0553471ab944674a25f015",
  measurementId: "G-G5RJCY4NV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();
export const db=getFirestore(app);
export const provider=new GoogleAuthProvider()