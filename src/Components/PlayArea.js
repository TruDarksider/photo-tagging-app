import React, { useEffect, useState } from 'react';

const PlayArea = (props) => {
    const answerKey = props;
    const [cursor, setCursor] = useState('crosshair');
    const [xCoor, setXCoor] = useState(0);
    const [yCoor, setYCoor] = useState(0);
   
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
      let bounds = e.target.getBoundingClientRect();
      setXCoor(e.clientX - bounds.left);
      setYCoor(e.clientY - bounds.top);
    }
  }

  const handleCorrectGuess = (data) => {
    if(data.topMin < yCoor && data.topMax > yCoor && data.leftMin < xCoor && data.leftMax > xCoor){
      console.log('You found the color!')
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
      let matchedColor = answerKey.answerKey.find(item => item.id === colorGuess);
      if(matchedColor){
        handleCorrectGuess(matchedColor.data);
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
    color1.textContent = 'Color1';
    colorOptions.appendChild(color1);
    let color2 = document.createElement('li');
    color2.textContent = 'Color2';
    colorOptions.appendChild(color2);
    let color3 = document.createElement('li');
    color3.textContent = 'Color3';
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
    
    const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

    const createBoard = () => {
        let PlayArea = document.querySelector('#PlayArea');
        let red = 255;
        let blue = 255+28;
        let green = 0;
        
        for (let i = 10; i > 0; i--){
          for (let j = 0; j < 15; j++){
            let square = document.createElement('div');
            let thisRed = Math.round(red - (255/14 * j));
            let thisGreen = Math.round(green + (2 * i * j));
            let thisBlue = Math.round(blue - (255/9 * i));
            let rgb = 'width:128px;height:108px;background-color:rgb(' + thisRed + ', ' + thisGreen + ', ' + thisBlue + ');';
            square.setAttribute('style', rgb);
            square.textContent = square.style.backgroundColor + ', ' + rgbToHex(thisRed, thisGreen, thisBlue) + ', left: ' + 128*j + ', top: ' + (1080-108*i);
            PlayArea.appendChild(square);
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