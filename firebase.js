// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8YBeeGf7n2hDA2cBgnH5jHbJf_d84tZg",
    authDomain: "confetti-4-u.firebaseapp.com",
    projectId: "confetti-4-u",
    storageBucket: "confetti-4-u.appspot.com",
    messagingSenderId: "509313793696",
    appId: "1:509313793696:web:ceed1a7cf20111451ed3c5",
    measurementId: "G-8EY4SVP4ET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export const submitToFirebase = async (formData) => {
    try {
        const docRef = await addDoc(collection(db, "messages"), formData);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id; // Return the document ID
    } catch (e) {
        console.error("Error adding document: ", e);
        return null; // Handle the error appropriately
    }
};