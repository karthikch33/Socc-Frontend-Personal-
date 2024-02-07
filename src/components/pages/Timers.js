import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(); // Initialize with 10 minutes in seconds
  
  useEffect(() => {
    const localStorageTime = localStorage.getItem('Time LoggedIn');
    const timerInterval = setInterval(() => {
      const timeLeft = calculateTimeLeft(localStorageTime);
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
      }
      setTimeLeft(timeLeft);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  function calculateTimeLeft(localStorageTime) {
    if (!localStorageTime) return 0;
    const startTime = new Date(localStorageTime).getTime();
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000;
    const remainingTime = 600 - elapsedTime; // 10 minutes in seconds
    return remainingTime > 0 ? Math.floor(remainingTime) : 0;
  }

  // Convert remaining seconds to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className='' style={{background:"#3e7dcc"}}>
      <h2 className='text-center '>Session Ends In</h2>
      <p className='text-center'>Time Remaining: {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</p>
    </div>
  );
};

export default Timer;
