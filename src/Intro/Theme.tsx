import React from 'react';
import { MORESUGAR } from './constants';
import { IntroTitle } from './IntroTitle';

interface ThemeProps {
  theme: string;
}

const introTheme: React.CSSProperties = {
  fontFamily: MORESUGAR,
  fontSize: "14vmin",
  textAlign: "center",
	position: "absolute",
	bottom: 160,
  width: "100%",
  color: "#00796B",
  textTransform: "uppercase",
  textShadow: "-4px 4px 0px #424242",
};

export const Theme: React.FC<ThemeProps> = ({ theme }) => {
  return (
    <h1 style={introTheme}>{theme}</h1>
  );
};