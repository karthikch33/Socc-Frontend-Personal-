import React from 'react';
// import './CoinFlip.css'; 

const TimerComponentForServer = ({ headsImageUrl, tailsImageUrl }) => {
  return (
    <div className="coin">
      <div className="side heads">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          width="100%"
          height="100%"
          version="1.1"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 4091.27 4091.73"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <g id="_1421344023328">
              <path
                fill="#87CEFA"
                fillRule="nonzero"
                d="M4030.06 2540.77c-273.24,1096.01 -1383.32,1763.02 -2479.46,1489.71 -1095.68,-273.24 -1762.69,-1383.39 -1489.33,-2479.31 273.12,-1096.13 1383.2,-1763.19 2479,-1489.95 1096.06,273.24 1763.03,1383.51 1489.76,2479.57l0.02 -0.02z"
              ></path>
              {/* First image*/}
              <image x="30%" y="30%" width="40%" height="40%" xlinkHref={headsImageUrl} />
            </g>
          </g>
        </svg>
      </div>
      <div className="side tails">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="svg_back"
          xmlSpace="preserve"
          width="100%"
          height="100%"
          version="1.1"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 4091.27 4091.73"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <g id="_1421344023328">
              <path
                fill="#87CEFA"
                fillRule="nonzero"
                d="M4030.06 2540.77c-273.24,1096.01 -1383.32,1763.02 -2479.46,1489.71 -1095.68,-273.24 -1762.69,-1383.39 -1489.33,-2479.31 273.12,-1096.13 1383.2,-1763.19 2479,-1489.95 1096.06,273.24 1763.03,1383.51 1489.76,2479.57l0.02 -0.02z"
              ></path>
              {/* Second image*/}
              <image x="30%" y="30%" width="40%" height="40%" xlinkHref={tailsImageUrl} />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default TimerComponentForServer;