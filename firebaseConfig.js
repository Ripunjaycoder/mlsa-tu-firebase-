// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey:="AIzaSyCNh_DsOHo0Xx66Bqur_Rp-vguLzyOEAAU",
  authDomain: "mlsa-tu.firebaseapp.com",
  projectId: "mlsa-tu",
  storageBucket: "mlsa-tu.appspot.com",
  messagingSenderId: "647728118466",
  appId: "1:647728118466:web:2ff00b038ae5919801995b",
  measurementId: "G-NLJYTLN4N5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
