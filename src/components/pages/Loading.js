import React from 'react';
import styled, { keyframes } from 'styled-components';

const $bgPink = '#fff';
const $white = '#fff';

const PageUpAnimation = keyframes`
  0% {
    transform: translateY(0%);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 1;
  }
`;

const LoadingTextAnimation = keyframes`
  0% {
    transform: translateY(0%);
    opacity: 1;
  }
  20% {
    transform: translateY(-60%);
    opacity: 1;
  }
  40% {
    transform: translateY(-100%);
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  opacity: 0;
  animation: ${PageUpAnimation} 1s ease 0s none;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  background: ${$bgPink};
`;

const LoadingData = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.h2`
  .char {
    opacity: 0;
    animation: ${LoadingTextAnimation} 2s infinite ease-in-out;
    display: inline-block;
    color: ${$white};
    &:nth-child(1) {
      animation-delay: 0.9s;
    }
    &:nth-child(2) {
      animation-delay: 1s;
    }
    &:nth-child(3) {
      animation-delay: 1.1s;
    }
    &:nth-child(4) {
      animation-delay: 1.2s;
    }
    &:nth-child(5) {
      animation-delay: 1.3s;
    }
    &:nth-child(6) {
      animation-delay: 1.4s;
    }
    &:nth-child(7) {
      animation-delay: 1.5s;
    }
  }
`;

const YourComponent = () => {
  return (
    <>
      <Background />
      <LoadingData>
        <LoadingText className='' style={{fontSize:"80px"}}>
          <span className="char">L</span>
          <span className="char">o</span>
          <span className="char">a</span>
          <span className="char">d</span>
          <span className="char">i</span>
          <span className="char">n</span>
          <span className="char">g</span>
        </LoadingText>
      </LoadingData>
    </>
  );
};

export default YourComponent;
