import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";

import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where 
} from "firebase/firestore";

// 🔹 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD12Mm3idywi5mQWPt8BilOuW6TbVBvwns",
  authDomain: "oraculum-e46a9.firebaseapp.com",
  projectId: "oraculum-e46a9",
  storageBucket: "oraculum-e46a9.appspot.com",
  messagingSenderId: "571411027620",
  appId: "1:571411027620:web:5b13d614ac7592b5e17831",
  measurementId: "G-WLNKGLJZPM"
};

//  Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

//  Ensure Google Sign-In Pop-Up only selects accounts (optional)
googleProvider.setCustomParameters({
  prompt: "select_account"
});

// User Signup (Email & Password)
const signupUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Signup Error:", error.message);
    throw new Error(error.message);
  }
};

//  User Login (Email/Password)
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw new Error(error.message);
  }
};

//  Google Sign-In
const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google Sign-In successful:", result.user);
    return result.user;
  } catch (error) {
    console.error("Google Login Error:", error.message);
    throw new Error(error.message);
  }
};

// User Logout
const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully.");
  } catch (error) {
    console.error("Logout Error:", error.message);
    throw new Error(error.message);
  }
};

//  Add Interview Result to Firestore
const addInterviewResult = async (userId, score, feedback) => {
  try {
    await addDoc(collection(db, "interviewResults"), {
      userId,
      score,
      feedback,
      timestamp: new Date(),
    });
    console.log("Interview result added successfully!");
  } catch (error) {
    console.error("Error adding interview result:", error);
    throw new Error(error.message);
  }
};

//  Fetch Interview Results from Firestore
const getInterviewResults = async (userId) => {
  try {
    const q = query(collection(db, "interviewResults"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    return results;
  } catch (error) {
    console.error("Error fetching interview results:", error);
    throw new Error(error.message);
  }
};

//  Export Modules
export { auth, db, signupUser, loginUser, loginWithGoogle, logoutUser, addInterviewResult, getInterviewResults };

