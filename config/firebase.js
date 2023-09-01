// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAyGVA905mwa9uecr16S18d_1mcHfAPO-I',
  authDomain: 'hello-mayor-6d338.firebaseapp.com',
  projectId: 'hello-mayor-6d338',
  storageBucket: 'hello-mayor-6d338.appspot.com',
  messagingSenderId: '398369600925',
  appId: '1:398369600925:web:4e4cd9311956e88d5aeb74',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
