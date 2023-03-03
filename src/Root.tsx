import {Composition} from 'remotion';
import {Intro} from './Intro';
import { quiz } from './quiz';
import {GuessTheWordQuiz} from './GuessTheWordQuiz';
import { useEffect, useState } from 'react';
import { getAudioDurationInSeconds } from '@remotion/media-utils';
import { Things } from './Things';

const introLength = Math.ceil(quiz.introLength) * 30;
const outroLength = Math.ceil(quiz.outroLength) * 30;

export const RemotionRoot: React.FC = () => {


  return (
    <>
      <Composition
        id="Guess-the-Word"
        component={GuessTheWordQuiz}
        durationInFrames={introLength + 9930 + outroLength} // INTRO + THINGS + OUTRO, manually set right now
        fps={30}
        width={1920}
        height={1080}
      />
        
    </>
  );
};
