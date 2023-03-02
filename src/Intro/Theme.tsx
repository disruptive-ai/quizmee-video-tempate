import React from 'react';
import { MORESUGAR } from './constants';
import { spring, useCurrentFrame, useVideoConfig } from "remotion"; // needed for spring animations

interface ThemeProps {
  theme: string;
}

const introTheme: React.CSSProperties = {
  
};

export const Theme: React.FC<ThemeProps> = ({ theme }) => {
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
      fontFamily: MORESUGAR,
      fontSize: "14vmin",
      textAlign: "center",
      position: "absolute",
      bottom: 160,
      width: "100%",
      color: "#00796B",
      textTransform: "uppercase",
      textShadow: "-4px 4px 0px #424242"}}>{theme}</h1>
  );
};