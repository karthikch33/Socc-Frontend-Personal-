import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const initialTimer = parseInt(localStorage.getItem('timer')) || 120; // Initial value is 120 seconds (2 minutes)
  const [timer, setTimer] = useState(initialTimer);

  useEffect(() => {
    localStorage.setItem('timer', timer.toString());

    const timerId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000); // Update the timer every 1 secon   

    const timeoutId = setTimeout(() => {
        localStorage.removeItem('timer');
        localStorage.removeItem('email')
        window.location.reload();
      }, timer * 1000);
  
      return () => {
        clearInterval(timerId);
        clearTimeout(timeoutId);
      };
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className={`timer-container ${timer < 120 ? 'less-than-two-minutes' : ''}`}>
      <p>Time remaining: {formatTime(timer)}</p>
      {timer < 120 && (
        <label htmlFor="" className="timeout-label text-danger" color='red'>
          Session Time's Out And Automatic Reload Happens
        </label>
      )}
      {/* Your component content */}
    </div>
  );
};

export default MyComponent;
