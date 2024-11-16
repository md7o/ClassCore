import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrBcRpggQIW-XtTrCp5jlcBfwuPGZAmow",
  authDomain: "classcorewebsite.firebaseapp.com",
  projectId: "classcorewebsite",
  storageBucket: "classcorewebsite.firebasestorage.app",
  messagingSenderId: "129873794927",
  appId: "1:129873794927:web:70e28b4d3af1ab74437a9a",
  measurementId: "G-6QVJ72GR7V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
