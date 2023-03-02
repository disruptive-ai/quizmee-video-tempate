import React from 'react';
import { OPENDYSLEXIC } from './Intro/constants';
import { spring, useCurrentFrame, useVideoConfig } from "remotion"; // needed for spring animations

interface numberTransitionProps {
  number: number;
}

export const NumberTransition: React.FC<numberTransitionProps> = ({ number }) => {
  // SPRING ANIMATION
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
 
  const scale = spring({
    fps,
    frame,
  });
  // END SPRING

  return (
    <h1 style={{ 
      transform: `scale(${scale})`,
      fontFamily: OPENDYSLEXIC,
      fontSize: "300px",
      textAlign: "center",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textShadow: "8px 8px #424242",
      WebkitTextStroke: "5px black" }}>{number}</h1>
  );
};
