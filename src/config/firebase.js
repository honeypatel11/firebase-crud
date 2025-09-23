
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBe5W4LKc08aOwL81vvpgpuxp1dobhSZ_E",
  authDomain: "crud-book-app-d9771.firebaseapp.com",
  projectId: "crud-book-app-d9771",
  storageBucket: "crud-book-app-d9771.firebasestorage.app",
  messagingSenderId: "33738739568",
  appId: "1:33738739568:web:4cefd3168e17a274d1c9b5"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore();