import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore";

const FireBaseApp = initializeApp();

const auth = getAuth(FireBaseApp);
const db = getFirestore(FireBaseApp);

const snapshot = await getDocs();

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("Logged in!");
  } else {
    console.log("No user");
  }
});
