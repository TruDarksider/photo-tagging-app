import './App.css';
import React from 'react';
import GameBar from './Components/GameBar.js';
import PlayArea from './Components/PlayArea';
//import DropdownMenu from './Components/DropdownMenu';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs } from 'firebase/firestore';

const firebaseConfig= {
  apiKey: "AIzaSyDnPN-s6Tupny3TFCQTLuRlzV6YOQxyNig",
  authDomain: "photo-tagging-app-b6ff2.firebaseapp.com",
  projectId: "photo-tagging-app-b6ff2",
  storageBucket: "photo-tagging-app-b6ff2.appspot.com",
  messagingSenderId: "99182045733",
  appId: "1:99182045733:web:a93697c3582f18245d2dcc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//The Backend call?
// Get a list of Colbys from your database
async function getColbyLocation(db) {
  const colbyCol = collection(db, 'colbys');
  const colbySnapshot = await getDocs(colbyCol);
  const colbyList = colbySnapshot.docs.map(doc => doc.data());
  return colbyList;
}

function App() {
  const answerKey = getColbyLocation(db);
  return (
    <div className="App">
      <GameBar />
      {/* <DropdownMenu /> */}
      <PlayArea answerKey={answerKey}/>
    </div>
  );
}

export default App;

/* Actions that need to happen:
Backend needs to have an answer key as to where each character is on image
-I need to create answer key, but what does the key look like? A set of pixels that is acceptable? Relative position within the picture?
-And is the key a picture or just a file with a list of possibilities?

--Above may be partially started by calling for the backend answer key.... which doesn't exist yet
- for reference: https://firebase.google.com/docs/firestore/query-data/get-data




*/
