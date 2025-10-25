// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
// import {...} from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMmSlKmFDkGI5e2zvKJQ10h9jI2GMhkwo",
  authDomain: "bitequest-a879a.firebaseapp.com",
  projectId: "bitequest-a879a",
  storageBucket: "bitequest-a879a.firebasestorage.app",
  messagingSenderId: "663209340329",
  appId: "1:663209340329:web:944441cd5cd570018d28b8",
  measurementId: "G-0H7RDPYF15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db };
