import React, { useState, useEffect, useCallback } from 'react';
import { Series, Sequence, AbsoluteFill, Audio, OffthreadVideo } from "remotion";
import { Theme } from './Intro/Theme';
import {Title} from './Intro/Title';
import { IntroTitle } from './Intro/IntroTitle';
import { NumberTransition } from './NumberTransition';
import { quiz } from './quiz';
import ImageGrid from './ImageGrid';
import { Img } from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { OPENDYSLEXIC, MORESUGAR} from './Intro/constants';
import { spring, useCurrentFrame, useVideoConfig } from "remotion"; // needed for spring animations


type Thing = {
  text: string;
  color: string;
};

const imageContainer = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  marginTop: '10%'
}

const imageStyle = {
  display: 'flex',
  height: 'auto',
  borderRadius: '50px',
  border: '20px solid #fff',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.25), 0 6px 8px rgba(0, 0, 0, 0.3)'
}

const numberStyle = {
  fontFamily: OPENDYSLEXIC,
  fontSize: "300px",
  color: "white",
  textShadow: "8px 8px #424242",
  WebkitTextStroke: "5px black",
  justifyContent: "center",
  alignItems: "center",
  display: "flex"
}

const outroStyle: React.CSSProperties = {
  fontFamily: MORESUGAR,
  position: 'absolute',
  width: '100%',
  bottom: '60'
}

export const Things: React.FC = () => {
  // SPRING ANIMATION
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
   
  const scale = spring({
    fps,
    frame,
  });
  // END SPRING

  const [jsonData, setJsonData] = useState<Thing[] | null>(null);
  const [bgDuration, setDuration] = useState<number | null>(null);
  const [thingsDuration, setThingsDuration] = useState(0);

  useEffect(() => {
    async function getThingsDuration() {
      let thingsDuration = 0;
      quiz.things.forEach(async (thing) => {
        const numberTransition = 60 / 30;
        const revealDuration = 240 / 30;
        const crazyFactDuration = (Math.ceil(thing.length + 2) * 30) / 30;
        thingsDuration += numberTransition + revealDuration + crazyFactDuration;
        console.log(thingsDuration);
        setThingsDuration(thingsDuration);
      }); 
    }
    getThingsDuration();
    console.log('thingsDuration is ' + (thingsDuration * 30));
    
  }, []);
  

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

  if (!jsonData || !bgDuration || !thingsDuration) {
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
          <Series.Sequence name={(index+1).toString()} durationInFrames={60}>
          <AbsoluteFill style={{backgroundColor: `${quiz.bgColor}`}}>
          <NumberTransition number={index+1}/>
          </AbsoluteFill>
          </Series.Sequence>
          <Series.Sequence name="Reveal Clip" durationInFrames={240}>
            <OffthreadVideo src={thing.revealClip} />
          </Series.Sequence>

          <Series.Sequence name="Crazy Fact" durationInFrames={Math.ceil(thing.length+2)*30}>
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

      <Series.Sequence name='Outro' durationInFrames={Math.ceil(quiz.outroLength*30)}>
        <AbsoluteFill style={{backgroundColor: `${quiz.bgColor}`}}>
        <Audio src={quiz.outroAudioLink} volume={1} />
        <Sequence from={0}>
          <IntroTitle title="See you next time!"/>
        </Sequence>
        <Sequence from={90}>
          <Theme style={outroStyle} theme="Don't forget to share!"/>
        </Sequence>
          
        </AbsoluteFill>
      </Series.Sequence>

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
