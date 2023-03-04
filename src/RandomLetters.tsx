import React, { useState, useEffect } from 'react';

const centeredText: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  fontSize: '48px',
};

interface RandomLettersProps {
  word: string;
}

const RandomLetters: React.FC<RandomLettersProps> = ({ word }) => {
  const [revealedWord, setRevealedWord] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 1000);

    if (currentIndex < word.length) {
      const revealedLetters = word.slice(0, currentIndex + 1);
      setRevealedWord(revealedLetters);
    }

    return () => clearInterval(interval);
  }, [currentIndex, word]);

  return <div style={centeredText}>{revealedWord}</div>;
};

export default RandomLetters;
