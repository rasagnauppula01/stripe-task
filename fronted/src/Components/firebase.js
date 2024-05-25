// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0SCRB22y3OUY-jryPWlGAB2b_e-ohxwA",
  authDomain: "swio-task.firebaseapp.com",
  projectId: "swio-task",
  storageBucket: "swio-task.appspot.com",
  messagingSenderId: "839609710655",
  databaseURL:"https://swio-task-default-rtdb.asia-southeast1.firebasedatabase.app/",
  appId: "1:839609710655:web:5a1d4673e882c50676208a"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(firebaseApp);

