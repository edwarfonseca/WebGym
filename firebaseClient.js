// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdY8hrsu9g0mWucBfANm0NfhHwjsNh28s",
  authDomain: "webgimnasio-49d4f.firebaseapp.com",
  projectId: "webgimnasio-49d4f",
  storageBucket: "webgimnasio-49d4f.firebasestorage.app",
  messagingSenderId: "261958428936",
  appId: "1:261958428936:web:9f29f81fefdd3a0ae2a4bd",
  measurementId: "G-GV0DST6FYQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
