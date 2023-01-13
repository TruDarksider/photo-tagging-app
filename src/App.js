import './App.css';
import React from 'react';
import GameBar from './Components/GameBar.js';
import PlayArea from './Components/PlayArea'
import { initializeApp } from 'firebase/app'

const firebaseConfig= {
  apiKey: "AIzaSyDnPN-s6Tupny3TFCQTLuRlzV6YOQxyNig",
  authDomain: "photo-tagging-app-b6ff2.firebaseapp.com",
  projectId: "photo-tagging-app-b6ff2",
  storageBucket: "photo-tagging-app-b6ff2.appspot.com",
  messagingSenderId: "99182045733",
  appId: "1:99182045733:web:a93697c3582f18245d2dcc"
};

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <GameBar />
      <PlayArea />
    </div>
  );
}

export default App;

/* Actions that need to happen:
Backend needs to have an answer key as to where each character is on image
-I need to create answer key, but what does the key look like? A set of pixels that is acceptable? Relative position within the picture?
-And is the key a picture or just a file with a list of possibilities?




*/
