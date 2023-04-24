import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
import 'firebase/compat/storage'; 

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC8foBht1ERLKa4VI3fjrkzxvVc5cMZfVs",
    authDomain: "insta-clone-react-c64b7.firebaseapp.com",
    projectId: "insta-clone-react-c64b7",
    storageBucket: "insta-clone-react-c64b7.appspot.com",
    messagingSenderId: "829478739237",
    appId: "1:829478739237:web:5b96216c93dedebda88ecc",
    measurementId: "G-9TCN6KMN2V"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export{db, auth, storage};

