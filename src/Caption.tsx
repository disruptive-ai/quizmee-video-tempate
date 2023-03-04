import React from 'react';

interface CaptionProps {
  currentTime: number;
  word: {
    text: string;
    start: number;
    end: number;
    confidence: number;
    speaker: string;
  };
}

function Caption({ currentTime, word }: CaptionProps) {
  const isVisible = currentTime >= word.start / 1000 && currentTime <= (word.end / 1000) + 0.5;

  const captionStyle = {
    display: isVisible ? 'block' : 'none',
    fontSize: "100px",
    color: "white",
    textShadow: "8px 8px #424242",
    WebkitTextStroke: "5px black",
    position: 'absolute',
    bottom: 100,
    textAlign: 'center',
    width: "100%"
  }

  return (
    <h1 style={captionStyle}>{word.text}</h1>
      
  );
}

export default Caption;