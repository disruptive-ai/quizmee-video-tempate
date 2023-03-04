import {Composition} from 'remotion';
import { quiz } from './quiz';
import {GuessTheWordQuiz} from './GuessTheWordQuiz';
import { useEffect, useState } from 'react';
import { getAudioDurationInSeconds } from '@remotion/media-utils';
import { Things } from './Things';
import PortraitCaption from './PortraitCaptions';
import { Portrait } from './Portrait';

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
      <Composition
        id="Portrait"
        component={Portrait}
        durationInFrames={500}
        fps={30}
        width={1080}
        height={1920}
      />
        
    </>
  );
};
