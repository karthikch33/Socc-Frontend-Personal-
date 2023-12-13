import React, { useState, useEffect } from 'react';

const Loading = () => {
  return (
    <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center">
    <div className={`loading-container'}`}>
      <div className="loading-spinner"></div>
      <p className='my-3'>Loading...</p>
      <label htmlFor="" className='text-danger'>Render Take's Time To Load For The First Time</label>
    </div>
        </div>
    </div>
  );
};

export default Loading;
