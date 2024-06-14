import React from 'react';
import styled, { keyframes } from 'styled-components';

const flash = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Dot = styled.div`
  width: 7px;
  height: 7px;
  background-color: red;
  border-radius: 50%;
  animation: ${flash} 2s infinite;
`;

const FlashingDot = () => {
  return <Dot />;
};

export default FlashingDot;
