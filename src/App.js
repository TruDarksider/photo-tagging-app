import './App.css';
import React, { useState, useEffect } from 'react';
import GameBar from './Components/GameBar.js';
import PlayArea from './Components/PlayArea';
import { collection, getDocs } from 'firebase/firestore'
import { db } from './init-firebase';

function App() {

  const [info, setInfo] = useState([]);

  useEffect(()=>{
    getColors();
  },[])

  function getColors(){
    const colorCollectionRef = collection(db, 'colors');
    getDocs(colorCollectionRef)
      .then(response =>{
        const allColors = response.docs.map(doc => ({
          data: doc.data(), 
          id: doc.id,
          found: false,
        }));
        setInfo(getThreeColors(allColors));
      })
      .catch(error=>console.log(error.message))
  }

  function getThreeColors(allColors) {
    let colorArray = [];
    for (let i = 0; i < 3; i++){
      let index = Math.floor(Math.random() * allColors.length);
      //Check for duplicate
      while (colorArray.indexOf(allColors[index])!==-1) {
        index = Math.floor(Math.random() * allColors.length);
        console.log('Oops a dupe')
      }
      colorArray.push(allColors[index]);
    }
    return colorArray;
  }

  function updateFound(e) {
    //const color2update = e.target.textContent;
    let tempColor = info;
    for (let color of tempColor) {
      if (color.id === e.target.textContent) {
        color.found = true;
      }
    }
    setInfo(tempColor);
  }

  return (
    <div className="App">
      <GameBar colors={info} />
      <PlayArea answerKey={info} updateFound={updateFound} />
    </div>
  );
}

export default App;

/* Actions that need to happen:
-IMPORTANT: Fix security rules, currently anyone could read/write
-Double click just always removes list item... also don't want to have to double click
-Maybe make some custom toasts
-Maybe make hover over last selected square
-Menu problems if bottom row or right most pixels need to be clicked
*/
