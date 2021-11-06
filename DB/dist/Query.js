// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  get,
  where,
  query,
  limit,
  toString,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAURAAyiw0MKqx20VrcYHd9b-UPH92YzCY",
  authDomain: "capstone-5d38a.firebaseapp.com",
  projectId: "capstone-5d38a",
  storageBucket: "capstone-5d38a.appspot.com",
  messagingSenderId: "860548385515",
  appId: "1:860548385515:web:52633e3005c51c3fd88cae",
};

const FireBaseApp = initializeApp(firebaseConfig);
const db = getFirestore(FireBaseApp);

const SS = collection(db, "Stores/SuperStore/Products");
const QF = collection(db, "Stores/QualityFoods/Products");

export async function getApples() {
  const querySnapshot = await getDocs(
    query(SS, where("Product", "==", "Apple"))
  );
  querySnapshot.forEach((snap) => {
    console.log(`Document ${snap.id} contains ${JSON.stringify(snap.data())}`);
  });
}
