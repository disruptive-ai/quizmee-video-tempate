import React from 'react';
import { AbsoluteFill } from 'remotion';
import { OPENDYSLEXIC } from './Intro/constants';

interface NumberTransitionProps {
  number: number;
}

const numberTransition: React.CSSProperties = {
  fontFamily: OPENDYSLEXIC,
  fontSize: "24vmin",
  textAlign: "center",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textShadow: "4px 4px 0px #000, -4px -4px 0px #000, -4px 4px 0px #000, 4px -4px 0px #000",
};

export const NumberTransition: React.FC<NumberTransitionProps> = ({ number }) => {
  return (
      <h1 style={numberTransition}>{number}</h1>
  );
};
