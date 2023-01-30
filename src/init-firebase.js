import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig= {
    apiKey: "AIzaSyDnPN-s6Tupny3TFCQTLuRlzV6YOQxyNig",
    authDomain: "photo-tagging-app-b6ff2.firebaseapp.com",
    projectId: "photo-tagging-app-b6ff2",
    storageBucket: "photo-tagging-app-b6ff2.appspot.com",
    messagingSenderId: "99182045733",
    appId: "1:99182045733:web:a93697c3582f18245d2dcc"
  };
  
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);