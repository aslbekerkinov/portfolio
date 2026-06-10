// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXEnZEdkgx7CuTkEnsi8SJAWB6Hsb3NOM",
  authDomain: "echat-dd65e.firebaseapp.com",
  projectId: "echat-dd65e",
  storageBucket: "echat-dd65e.firebasestorage.app",
  messagingSenderId: "259542625376",
  appId: "1:259542625376:web:2f90b8fddcc94bc920a705"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);