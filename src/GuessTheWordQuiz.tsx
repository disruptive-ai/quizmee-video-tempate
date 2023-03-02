import React, { useState, useEffect } from 'react';
import { Series, Sequence, AbsoluteFill, FolderContext } from "remotion";
import { Theme } from './Intro/Theme';
import {Title} from './Intro/Title';
import { IntroTitle } from './Intro/IntroTitle';
import {RandomLetters} from './RandomLetters';
import { NumberTransition } from './NumberTransition';
import { quiz } from './quiz';
import ImageGrid from './ImageGrid';
import { Img } from "remotion";


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


export const GuessTheWordQuiz: React.FC = () => {
  const [jsonData, setJsonData] = useState<Thing[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://bafybeidq3jc3mxmebnnd372vcpjk7ghkczdhnslp3qgmb7ehoxffsw3e3u.ipfs.nftstorage.link/things.json');
      const data = await response.json();
      setJsonData(data);
    }

    fetchData();
  }, []);

  if (!jsonData) {
    return null; // or display a loading spinner
  }

  return (
    <Series>
      {/* <Series.Sequence name='Grid' durationInFrames={200}>
        <ImageGrid />
      </Series.Sequence> */}
      <Series.Sequence name='Intro' durationInFrames={100}>
        <AbsoluteFill style={{backgroundColor: `${quiz.bgColor}`}}>
          <IntroTitle title={quiz.quizType}/>
          <Sequence from={50}>
            <Theme theme={quiz.theme}/>
          </Sequence>
        </AbsoluteFill>
      </Series.Sequence>
      {/* <Series.Sequence name='RandomLetters' durationInFrames={200}>
        <RandomLetters />
      </Series.Sequence> */}
      {quiz.things.map((thing, index) => (
        <React.Fragment key={index}>
          <Series.Sequence durationInFrames={60}>
            <NumberTransition number={index+1}/>
          </Series.Sequence>
          <Series.Sequence durationInFrames={240}>
            <div style={imageContainer}>
              <Img style={imageStyle} src={thing.image} />
            </div>
            
            <Title titleText={thing.name} />
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
