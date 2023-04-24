import React, { useState, useEffect } from 'react';

const GameClock = (props) => {
    const { colors } = props
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10)
        } else if (!isRunning) {
            clearInterval(interval);
        }
        endGame();
        return () => clearInterval(interval);
    }, [time, isRunning]);

    function endGame() {
      if (colors.length === 3 && colors[0].found && colors[1].found && colors[2].found) {
        setIsRunning(false);
      }
    }

    const minutes = Math.floor(time / 60000 % 60);
    const seconds = Math.floor(time / 1000 % 60);
    const milliseconds = time / 10 % 100;

    return (
        <div className='GameClockContainer'>
            <span className='GameClock'>{minutes.toString().padStart(2,'00')}:{seconds.toString().padStart(2, '00')}.{milliseconds.toString().padStart(2, '00')}</span>
        </div>
    )
}

export default GameClock;