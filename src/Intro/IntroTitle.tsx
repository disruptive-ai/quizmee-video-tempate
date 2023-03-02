import React from 'react';
import { OPENDYSLEXIC } from './constants';
import { spring, useCurrentFrame, useVideoConfig } from "remotion"; // needed for spring animations

interface IntroTitleProps {
  title: string;
}

const introTitle: React.CSSProperties = {
  fontFamily: OPENDYSLEXIC,
  fontSize: "14vmin",
  textAlign: "center",
  width: "100%",
  color: "white",
  position: "absolute",
  paddingLeft: "20%",
  paddingRight: "20%",
  lineHeight: "18vmin",
  top: 160,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textShadow: "8px 8px #000",
  WebkitTextStroke: "5px black"
};

export const IntroTitle: React.FC<IntroTitleProps> = ({ title }) => {
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
      fontSize: "14vmin",
      textAlign: "center",
      width: "100%",
      color: "white",
      position: "absolute",
      paddingLeft: "20%",
      paddingRight: "20%",
      lineHeight: "18vmin",
      top: 160,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textShadow: "8px 8px #000",
      WebkitTextStroke: "5px black" }}>{title}</h1>
  );
};
