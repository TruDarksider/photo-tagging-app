import './App.css';
import React, { useState, useEffect } from 'react';
import GameBar from './Components/GameBar.js';
import PlayArea from './Components/PlayArea';
import { collection, getDocs } from 'firebase/firestore'
import { db } from './init-firebase';

function App() {

  const [info, setInfo] = useState([]);

  useEffect(()=>{
    getColbys();
  },[])

  function getColbys(){
    const colbyCollectionRef = collection(db, 'ColbyLocations');
    getDocs(colbyCollectionRef)
      .then(response =>{
        const colbys = response.docs.map(doc => ({
          data: doc.data(), 
          id: doc.id,
        }));
        setInfo(colbys);
      })
      .catch(error=>console.log(error.message))
  }

  return (
    <div className="App">
      <GameBar />
      <PlayArea answerKey={info}/>
    </div>
  );
}

export default App;

/* Actions that need to happen:
-IMPORTANT: Fix security rules, currently anyone could read/write




*/
