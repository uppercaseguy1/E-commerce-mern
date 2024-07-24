// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUXl-AXOMN8EvxdK5nDgkrS3NeeICU4gM",
    authDomain: "estore-upload-images.firebaseapp.com",
    projectId: "estore-upload-images",
    storageBucket: "estore-upload-images.appspot.com",
    messagingSenderId: "1020623041958",
    appId: "1:1020623041958:web:5858473b241f9814e2cb67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;