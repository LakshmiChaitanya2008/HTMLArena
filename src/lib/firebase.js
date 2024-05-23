import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDF4d4fGTzG_yEj5RUzxx-u_RMeFOPvZ-A",
  authDomain: "htmlarena-e0951.firebaseapp.com",
  projectId: "htmlarena-e0951",
  storageBucket: "htmlarena-e0951.appspot.com",
  messagingSenderId: "263519956556",
  appId: "1:263519956556:web:d1d58bb36655bcc4438ee9",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
