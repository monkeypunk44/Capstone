import React from "react";
import { render } from "react-dom";
import App from "./App";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
} from "firebase/firestore/lite";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAURAAyiw0MKqx20VrcYHd9b-UPH92YzCY",
  authDomain: "capstone-5d38a.firebaseapp.com",
  projectId: "capstone-5d38a",
  storageBucket: "capstone-5d38a.appspot.com",
  messagingSenderId: "860548385515",
  appId: "1:860548385515:web:52633e3005c51c3fd88cae",
  measurementId: "G-Y53QRDMMMT",
};

// Initialize Firebase
const FireBaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(FireBaseApp);

const auth = getAuth(FireBaseApp);
const db = getFirestore(FireBaseApp);

// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, "cities");
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   return cityList;
// }

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("Logged in!");
  } else {
    console.log("No user");
  }
});

render(<App />, document.getElementById("root"));
