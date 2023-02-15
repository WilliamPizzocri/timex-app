import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyADNi7kV4W5Vp-ey33pXVxfB85gIgeMYrc",
  authDomain: "timex-app-98255.firebaseapp.com",
  projectId: "timex-app-98255",
  storageBucket: "timex-app-98255.appspot.com",
  messagingSenderId: "1077084449337",
  appId: "1:1077084449337:web:bb44cc76a3cec5b6c9bbe8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

const storage = getStorage(app);

export { auth, db, provider, storage };