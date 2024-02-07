import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [timeLeft, setTimeLeft] = useState(); 

  useEffect(() => {
    const localStorageTime = localStorage.getItem('EmailTimeLoggedIn');
    const timerInterval = setInterval(() => {
      const timeLeft = calculateTimeLeft(localStorageTime);
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        localStorage.removeItem('EmailTimeLoggedIn')
      }
      setTimeLeft(timeLeft);
      timeLeft <= 0 && window.location.reload()
    }, 1000);
  }, [timeLeft]);


  function calculateTimeLeft(localStorageTime) {
    if (!localStorageTime) return 0;
    const startTime = new Date(localStorageTime).getTime();
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000;
    const remainingTime = 90 - elapsedTime; // 1 minute and 30 seconds in seconds
    return remainingTime > 0 ? Math.floor(remainingTime) : 0;
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className={`timer-container ${timeLeft < 120 ? 'less-than-two-minutes' : ''}`}>
      <p>Time remaining: {formatTime(timeLeft)}</p>
      {timeLeft < 120 && (
        <label htmlFor="" className="timeout-label text-danger" color='red'>
          Session Time's Out And Automatic Reload Happens
        </label>
      )}
      {/* Your component content */}
    </div>
  );
};

export default MyComponent;
