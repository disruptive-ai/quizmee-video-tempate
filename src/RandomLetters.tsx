import React, { useState, useEffect } from "react";
import { useVideoConfig, random } from "remotion";

const WORD = "shark";

export const RandomLetters: React.FC = () => {
  const videoConfig = useVideoConfig();
  const [shownLetters, setShownLetters] = useState(Array.from(WORD, () => 0));

  useEffect(() => {
    const shuffledWord = shuffle(WORD.split(""));
    let timeout = 0;
    shuffledWord.forEach((letter, index) => {
      const duration = 7000 / shuffledWord.length;
      const position = WORD.indexOf(letter);
      if (shownLetters[position] === 0) {
        timeout += (position / (WORD.length - 1)) * duration;
        setTimeout(() => {
          setShownLetters(prevLetters => {
            const newLetters = [...prevLetters];
            newLetters[position] = 1;
            return newLetters;
          });
        }, timeout);
      }
    });
  }, []);

  const shuffle = (array: any[]) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(random(`random-index-${currentIndex}`) * currentIndex);
      currentIndex--;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  return (
    <h1
      style={{
        color: "black",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {WORD.split("").map((letter, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            fontSize: "72px",
            opacity: shownLetters[index],
          }}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
};
