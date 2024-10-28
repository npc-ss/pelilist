// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZOxWr60lIeVrZHObTb_2rdlzPcz1e35k",
  authDomain: "wubi-db9a2.firebaseapp.com",
  projectId: "wubi-db9a2",
  storageBucket: "wubi-db9a2.appspot.com",
  messagingSenderId: "259816360239",
  appId: "1:259816360239:web:03dd463d2b9fb98996f9da",
  measurementId: "G-093Q9084DT"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase 