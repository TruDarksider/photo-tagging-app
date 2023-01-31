import React, { useEffect, useState } from 'react';
import image from '../ColbysAndCrew.png'

const PlayArea = (props) => {
  const answerKey = props;
  const [cursor, setCursor] = useState('crosshair');
  const [xCoor, setXCoor] = useState(0);
  const [yCoor, setYCoor] = useState(0);

  const changeCursor = () => {
    setCursor(prevState =>{
      if(prevState === 'crosshair'){
        return 'pointer'
      }
      return 'crosshair';
    });
  }

  const handleGuess = () => {
    document.querySelector('img').onclick = function getCoordinates(e) {
      let bounds = e.target.getBoundingClientRect();
      setXCoor(e.clientX - bounds.left);
      setYCoor(e.clientY - bounds.top);
    }
  }

  const handleCorrectGuess = (data) => {
    if(data.topMin < yCoor && data.topMax > yCoor && data.leftMin < xCoor && data.leftMax > xCoor){
      console.log('That is the correct location of that Colby!')
    } else {
      handleIncorrectGuess();
    }
  }

  const handleIncorrectGuess = () => {
    console.log('That was not the correct Colby');
  }

  const isThisTheColby = (e) => {
    if(e.target.matches('li')){
      let colbyGuess = e.target.textContent;
      let matchedColby = answerKey.answerKey.find(item => item.id === colbyGuess);
      if(matchedColby){
        handleCorrectGuess(matchedColby.data);
      } else {
        handleIncorrectGuess();
      }
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
    colby1.textContent = 'NoNoseColby';
    colbyOptions.appendChild(colby1);
    let colby2 = document.createElement('li');
    colby2.textContent = 'GoatColby';
    colbyOptions.appendChild(colby2);
    let colby3 = document.createElement('li');
    colby3.textContent = 'CollegeColby';
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
      isThisTheColby(e);
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