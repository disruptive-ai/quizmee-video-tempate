import React, { useState, useEffect, useCallback } from 'react';
import { Series, Sequence, AbsoluteFill, Audio } from "remotion";
import { Theme } from './Intro/Theme';
import {Title} from './Intro/Title';
import { IntroTitle } from './Intro/IntroTitle';
import { NumberTransition } from './NumberTransition';
import { quiz } from './quiz';
import ImageGrid from './ImageGrid';
import { Img } from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { Things } from './Things';

export const GuessTheWordQuiz: React.FC = () => {

  const [bgDuration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    async function getDuration() {
      const remote = await getAudioDurationInSeconds(quiz.bgAudio); // 189.62
      setDuration(remote);
      console.log(remote)
    }
    getDuration();
  }, []);

  if (!bgDuration) {
    return null; // or display a loading spinner
  }


  return (
    <>
      <Sequence from={0}>
            <Things />
      </Sequence>
      <Sequence name="BG Track" from={0}>
        <Audio loop src={quiz.bgAudio} volume={0.4} />
      </Sequence>
      
      
    </>
  );
  
  
};
