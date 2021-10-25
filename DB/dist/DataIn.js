import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import "regenerator-runtime/runtime";

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

const fs = require("fs").promises;
const readline = require("readline");
// command line argument getter
// var items = process.argv[2];
// var prices = process.argv[3];
var items = "c:/Users/ajblo/OneDrive/Documents/GitHub/Capstone/SSItems.json";
var prices = "c:/Users/ajblo/OneDrive/Documents/GitHub/Capstone/SSPrice.json";
// Initialize Firebase
const FireBaseApp = initializeApp(firebaseConfig);

// Get DB
const db = getFirestore(FireBaseApp);

async function processLineByLine() {
  const fileStream = fs.createReadStream(
    "c:/Users/ajblo/OneDrive/Documents/GitHub/Capstone/SSItems.txt"
  );

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`);
  }
}

export async function AddData(db) {
  const str = "Products/";
  const path = processLineByLine();
  //const price = processLineByLine(prices);
  //const docRef = doc(db, "Stores/SuperStore");
  // while (path !== "") {
  // const docRefChild = doc(docRef, str.concat(" ", path));
  // function create() {
  //   const write = {
  //     Price: price,
  //     Sale: false,
  //     SalePrice: 0,
  //   };
  //   setDoc(docRefChild, write, { merge: true });
  // }
  //console.log(create());
  //}
}

export async function AddCollection(db, store) {
  const docRef = collection(db, "Stores/");

  const Snapshot = await getDocs(docRef);
  const List = Snapshot.docs.map((doc) => doc.data());
  return List;
}
