import React from 'react';

const Hexagon = (props) => {
    const {language,logo} = props
  return (
    <div className="hexagon">
      <div className='d-flex justify-content-center align-items-center flex-column'>
        <img src={logo} className='' style={{mixBlendMode:"darken"}} width={100} height={60} alt="" />
        <label htmlFor="">{language}</label>
      </div>
      <div className="face1"></div>
      <div className="face2"></div>
    </div>
  );
};

export default Hexagon;