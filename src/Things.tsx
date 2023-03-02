import React, { useState, useEffect, useCallback } from 'react';
import { Series, Sequence, AbsoluteFill, Audio, OffthreadVideo } from "remotion";
import { Theme } from './Intro/Theme';
import {Title} from './Intro/Title';
import { IntroTitle } from './Intro/IntroTitle';
import {RandomLetters} from './RandomLetters';
import { NumberTransition } from './NumberTransition';
import { quiz } from './quiz';
import ImageGrid from './ImageGrid';
import { Img } from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";


type Thing = {
  text: string;
  color: string;
};

const imageContainer = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '500px',
  objectFit: 'contain',
  marginTop: '5%'

}

const imageStyle = {
  display: 'flex',
  width: '500px',
  height: 'auto',
  borderRadius: '50px',
  border: '20px solid #fff',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.25), 0 6px 8px rgba(0, 0, 0, 0.3)'
}

export const Things: React.FC = () => {
  const [jsonData, setJsonData] = useState<Thing[] | null>(null);
  const [bgDuration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://bafybeidq3jc3mxmebnnd372vcpjk7ghkczdhnslp3qgmb7ehoxffsw3e3u.ipfs.nftstorage.link/things.json');
      const data = await response.json();
      setJsonData(data);
    }
    fetchData();

    async function getDuration() {
      const remote = await getAudioDurationInSeconds(quiz.bgAudio); // 50.24
      setDuration(remote);
    }
    getDuration();

  }, []);

  if (!jsonData || !bgDuration) {
    return null; // or display a loading spinner
  }

  return (
    <Series>
      <Series.Sequence name='Intro' durationInFrames={Math.ceil(quiz.introLength*30)}>
        <AbsoluteFill style={{backgroundColor: `${quiz.bgColor}`}}>
        <Audio src={quiz.introAudioLink} volume={1} />
          <IntroTitle title={quiz.quizType}/>
          <Sequence from={50}>
            <Theme theme={quiz.theme}/>
          </Sequence>
        </AbsoluteFill>
      </Series.Sequence>
      {quiz.things.map((thing, index) => (
        <React.Fragment key={index}>
          <Series.Sequence durationInFrames={60}>
          <AbsoluteFill style={{backgroundColor: `${quiz.bgColor}`}}>
            <NumberTransition number={index+1}/>
          </AbsoluteFill>
          </Series.Sequence>
          <Series.Sequence durationInFrames={240}>
            <OffthreadVideo src={thing.revealClip} />
          </Series.Sequence>
          <Series.Sequence durationInFrames={Math.ceil(thing.length)*30}>
            <AbsoluteFill style={{backgroundColor: `${quiz.contrastColor}`}}>
              <div style={imageContainer}>
                  <Img style={imageStyle} src={thing.image} />
              </div>
              <Audio src={thing.crazyFactLink} volume={1} />
            </AbsoluteFill>
            <Title titleText={thing.name} titleColor={'white'}/>
          </Series.Sequence>
        </React.Fragment>
      ))}

      {/* {jsonData.map((quiz, index) => (
        <Series.Sequence key={index} durationInFrames={240} name={quiz.title}>
          <div>
            <Title titleText={thing.text} titleColor='black'/>
          </div>
        </Series.Sequence>
      ))} */}
    </Series>
  );
  
  
};
