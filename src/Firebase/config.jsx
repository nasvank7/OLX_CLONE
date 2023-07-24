

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1QLomXkJSBPP8rd9_u7IvOlEzj9rfY6E",
  authDomain: "olxclone-e4299.firebaseapp.com",
  projectId: "olxclone-e4299",
  storageBucket: "olxclone-e4299.appspot.com",
  messagingSenderId: "856691172003",
  appId: "1:856691172003:web:8ebc8e08e0e8d59d6e9516",
  measurementId: "G-KL1LJLMZZ7"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase