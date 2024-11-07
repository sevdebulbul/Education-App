// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "{your-api-key}",
  authDomain: "{your-auth-domain}",
  projectId: "{your-project-id}",
  storageBucket: "{your-storage-bucket}",
  messagingSenderId: "{your-messaging-sender-id}",
  appId: "{your-app-id}",
  measurementId: "{your-measurement-id}"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);