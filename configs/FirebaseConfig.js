// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsGUnyjdvqmBcjfAIq87Zomt1soAVnZu4",
  authDomain: "travelapp-290d1.firebaseapp.com",
  projectId: "travelapp-290d1",
  storageBucket: "travelapp-290d1.appspot.com",
  messagingSenderId: "514268631138",
  appId: "1:514268631138:web:e55e7f4a990cfe241e813b",
  measurementId: "G-E3SWK5SZD2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
