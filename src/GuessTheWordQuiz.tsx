import React, { useState, useEffect } from 'react';
import { Series, Sequence } from "remotion";
import { Intro } from './Intro';

type Thing = {
  text: string;
  color: string;
};

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
      <Series.Sequence name='Intro' durationInFrames={100}>
        INTRO GOES HERE
        {/* <Intro /> */}
      </Series.Sequence>
      {jsonData.map((thing, index) => (
        <Series.Sequence key={index} durationInFrames={240} name={thing.text}>
          <div>
            <h1>{thing.text}</h1>
            <p>{thing.color}</p>
          </div>
        </Series.Sequence>
      ))}
    </Series>
  );
  
  
};
