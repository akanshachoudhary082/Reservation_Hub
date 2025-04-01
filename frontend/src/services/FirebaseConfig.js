// src/services/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFclmY3qDYskF_gEnduriFbAtoVf_5h48",
  authDomain: "mobile-auth-d4b7e.firebaseapp.com",
  projectId: "mobile-auth-d4b7e",
  storageBucket: "mobile-auth-d4b7e.firebasestorage.app",
  messagingSenderId: "381189096220",
  appId: "1:381189096220:web:f5d00d3173dfb25886f0d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};