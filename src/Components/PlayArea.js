import React, { useState } from 'react';
import image from '../ColbysAndCrew.png'

const PlayArea = () => {
  const [cursor, setCursor] = useState('crosshair');
  const [guess, setGuess] = useState(false);

  const changeCursor = () => {
    setCursor(prevState =>{
      if(prevState === 'crosshair'){
        return 'pointer'
      }
      return 'crosshair';
    });
  }

  const handleGuess = () => {
    setGuess(!guess)
    document.querySelector('img').onclick = function getCoordinates(e) {
      let bounds = e.target.getBoundingClientRect();
      let xCoor = e.clientX - bounds.left;
      let yCoor = e.clientY - bounds.top;
      console.log('Left: ' + xCoor + ' Top: ' + yCoor);
    }
  }

  function showColbyOptions(e) {
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
    let colbyOptions = document.createElement('ul');
    let colby1 = document.createElement('li');
    colby1.textContent = 'Colby 1';
    colbyOptions.appendChild(colby1);
    let colby2 = document.createElement('li');
    colby2.textContent = 'Colby 2';
    colbyOptions.appendChild(colby2);
    let colby3 = document.createElement('li');
    colby3.textContent = 'Colby 3';
    colbyOptions.appendChild(colby3);
    mouseMenu.appendChild(colbyOptions);
    document.getElementById('PlayArea').appendChild(mouseMenu);
    document.getElementById('myDropdown').classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
    function removeDropdown(e){
    if (!e.target.matches('li') ) {
      document.getElementById('myDropdown').remove();
    }
  } 

  const colbyLocationGuess = (e) => {
    if(document.getElementById('myDropdown')){
      removeDropdown(e);
      changeCursor();
    } else {
      changeCursor();
      handleGuess();
      showColbyOptions(e);
    }
  }

    return (
        <div id='PlayArea' className="PlayArea" style={{cursor: cursor}} onClick={colbyLocationGuess}>
            <img src={image} alt='Character collage using You are Colby artwork' />
        </div>
    );
};

export default PlayArea;