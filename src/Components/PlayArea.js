//import { doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
/* import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore' */

const PlayArea = (props) => {
  const { answerKey, updateFound } = props;
  const [cursor, setCursor] = useState('crosshair');
  const [xCoor, setXCoor] = useState(0);
  const [yCoor, setYCoor] = useState(0);

  //Firebase Stuff
  /* const firebaseConfig= {
    apiKey: "AIzaSyDnPN-s6Tupny3TFCQTLuRlzV6YOQxyNig",
    authDomain: "photo-tagging-app-b6ff2.firebaseapp.com",
    projectId: "photo-tagging-app-b6ff2",
    storageBucket: "photo-tagging-app-b6ff2.appspot.com",
    messagingSenderId: "99182045733",
    appId: "1:99182045733:web:a93697c3582f18245d2dcc"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(); */
   
    useEffect(()=>{
        createBoard();    
    },[])

  const changeCursor = () => {
    setCursor(prevState =>{
      if(prevState === 'crosshair'){
        return 'pointer'
      }
      return 'crosshair';
    });
  }

  const handleGuess = () => {
    document.querySelector('#PlayArea').onclick = function getCoordinates(e) {
      if (!e.target.matches('li')) {
        let bounds = e.target.parentNode.getBoundingClientRect();
        setXCoor(e.clientX - bounds.left);
        setYCoor(e.clientY - bounds.top);
      }
    }
  }

  const handleCorrectGuess = (data, colorGuess) => {
    if (data.top < yCoor && data.top + 108 > yCoor && data.left < xCoor && data.left + 128 > xCoor) {
      //Update Color.Found and Change background color
      let id = '#A' + colorGuess; //'A' is because some id's would be invalid
      document.querySelector(id).style.backgroundColor = '#'+colorGuess;
      console.log(answerKey)
    } else {
      handleIncorrectGuess();
    }
  }

    const handleIncorrectGuess = () => {
      //TO DO logic to tell user if color has more red/green/blue
    console.log('That was not the correct Color');
  }

  const isThisTheColor = (e) => {
    if(e.target.matches('li')){
      let colorGuess = e.target.textContent;
      let matchedColor = answerKey.find(item => item.id === colorGuess);
      if (matchedColor) {
        e.target.onclick = updateFound;
        handleCorrectGuess(matchedColor.data, colorGuess);
      } else {
        handleIncorrectGuess();
      }
    }
  }

  function showColorOptions(e) {
    //Create Container Div
    let mouseMenu = document.createElement('div');
    mouseMenu.setAttribute('id', 'myDropdown');
    mouseMenu.classList.add('dropdown-content');
    let x = e.clientX;
    let y = e.clientY;
    mouseMenu.style.position = 'fixed';
    mouseMenu.style.left = x + 'px';
    mouseMenu.style.top = y + 'px';
    //Create Menu
    let colorOptions = document.createElement('ul');
    let color1 = document.createElement('li');
    color1.textContent = answerKey.at(0).id;
    colorOptions.appendChild(color1);
    let color2 = document.createElement('li');
    color2.textContent = answerKey.at(1).id;
    colorOptions.appendChild(color2);
    let color3 = document.createElement('li');
    color3.textContent = answerKey.at(2).id;
    colorOptions.appendChild(color3);
    mouseMenu.appendChild(colorOptions);
    document.getElementById('PlayArea').appendChild(mouseMenu);
    document.getElementById('myDropdown').classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  function removeDropdown(e){
    if (!e.target.matches('li') ) {
      document.getElementById('myDropdown').remove();
    }
  } 

  const colorLocationGuess = (e) => {
    if(document.getElementById('myDropdown')){
      removeDropdown(e);
      isThisTheColor(e);
      changeCursor();
    } else {
      changeCursor();
      handleGuess();
      showColorOptions(e);
    }
  }
    
  function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}

    const createBoard = async () => {
        let PlayArea = document.querySelector('#PlayArea');
        let red = 255;
        let blue = 255+28;
      let green = 0;
        
        for (let i = 10; i > 0; i--){
          for (let j = 0; j < 15; j++){
            let square = document.createElement('div');
            square.classList.add('colorSquare')
            let thisRed = Math.round(red - (255/14 * j));
            let thisGreen = Math.round(green + (2 * i * j));
            let thisBlue = Math.round(blue - (255 / 9 * i));
            let left = 128 * j;
            let top = 1080 - 108 * i;
            let rgb = 'width:128px;height:108px;background-color:rgb(' + thisRed + ', ' + thisGreen + ', ' + thisBlue + ');';
            square.setAttribute('style', rgb);
            square.textContent = square.style.backgroundColor + ', ' + rgbToHex(thisRed, thisGreen, thisBlue) + ', left: ' + left + ', top: ' + top;
            PlayArea.appendChild(square);
            //Write to db
            /* let thisSquare = doc(db, 'colors/' + rgbToHex(thisRed, thisGreen, thisBlue))
            setDoc(thisSquare, { left: left, top: top, })
              .then(() => console.log('Yay'))
            .catch((error)=>console.log(error)) */

          }
        }
      PlayArea.setAttribute('style', 'width:1920px;height:1080px;display:flex;flex-wrap:wrap;');
    }
  
    return (
        <div id='PlayArea' className="PlayArea" style={{ cursor: cursor }} onClick={colorLocationGuess}>
        </div>
    );
};

export default PlayArea;