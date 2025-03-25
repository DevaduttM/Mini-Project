import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD12Mm3idywi5mQWPt8BilOuW6TbVBvwns",
  authDomain: "oraculum-e46a9.firebaseapp.com",
  projectId: "oraculum-e46a9",
  storageBucket: "oraculum-e46a9.firebasestorage.app",
  messagingSenderId: "571411027620",
  appId: "1:571411027620:web:5b13d614ac7592b5e17831",
  measurementId: "G-WLNKGLJZPM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };