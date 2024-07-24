import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJcShgB872TV4jc2YueOubKRTCYzQvmAo",
    authDomain: "e-commerce-images-1a64b.firebaseapp.com",
    projectId: "e-commerce-images-1a64b",
    storageBucket: "e-commerce-images-1a64b.appspot.com",
    messagingSenderId: "16570267259",
    appId: "1:16570267259:web:f3880cafc8a9685fd554de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;