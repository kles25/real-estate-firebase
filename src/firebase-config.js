import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_FIREBASE_KEY}`,
    authDomain: "real-estate-1c673.firebaseapp.com",
    projectId: "real-estate-1c673",
    storageBucket: "real-estate-1c673.appspot.com",
    messagingSenderId: "461133790278",
    appId: "1:461133790278:web:8964a818f3145b52f05e47",
    measurementId: "G-6D7X8JZMNQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };