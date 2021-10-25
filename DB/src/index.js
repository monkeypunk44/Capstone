// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { AddData, AddCollection } from "../dist/DataIn.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later
const firebaseConfig = {
  apiKey: "AIzaSyAURAAyiw0MKqx20VrcYHd9b-UPH92YzCY",
  authDomain: "capstone-5d38a.firebaseapp.com",
  projectId: "capstone-5d38a",
  storageBucket: "capstone-5d38a.appspot.com",
  messagingSenderId: "860548385515",
  appId: "1:860548385515:web:52633e3005c51c3fd88cae",
};

// Initialize Firebase
const FireBaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(FireBaseApp);

const auth = getAuth(FireBaseApp);
const db = getFirestore(FireBaseApp);

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("Logged in!");
  } else {
    console.log("No User");
  }
});

console.log(AddData(db));
