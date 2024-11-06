// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH_3aZFMModVD2wuh8bum_Tr8kmHlgG6Y",
  authDomain: "product-api-58da4.firebaseapp.com",
  projectId: "product-api-58da4",
  storageBucket: "product-api-58da4.appspot.com",
  messagingSenderId: "471945398745",
  appId: "1:471945398745:web:635d55a3c54412f584b1c8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
