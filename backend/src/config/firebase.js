import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
    apiKey: "AIzaSyD3bR5q-Lho80p_XAIhsZtolrM8K0-l7EM",
    authDomain: "fiadofacil-6b475.firebaseapp.com",
    projectId: "fiadofacil-6b475",
    storageBucket: "fiadofacil-6b475.firebasestorage.app",
    messagingSenderId: "868058937936",
    appId: "1:868058937936:web:a3511478c0f30e82bbaf55"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);