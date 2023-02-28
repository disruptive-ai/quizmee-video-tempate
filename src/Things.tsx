import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	AbsoluteFill,
  Series,
  OffthreadVideo
} from 'remotion';
import { getVideoMetadata } from "@remotion/media-utils";
import { getAudioDurationInSeconds } from "@remotion/media-utils";

// GET AUDIO DURATION
// const MyComp: React.FC = () => {
//   const getDuration = useCallback(async () => {
//     const remote = await getAudioDurationInSeconds(
//       "https://cdn.shotstack.io/au/stage/drluynwhea/adba85a1-e676-45b9-ae26-16820b79baea.mp3"
//     ); // 50.24
//   }, []);

//   useEffect(() => {
//     getDuration();
//   }, []);

//   return null;
// };

type Thing = {
  text: string;
  color: string;
};

export const Things: React.FC = () => {
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

  const things = jsonData.map((thing, index) => (
    <div key={index}>
      <h1>{thing.text}</h1>
    </div>
  ));

  return (
    <Series>
      <Series.Sequence durationInFrames={40}>
        {jsonData[0].text}
      </Series.Sequence>
      <Series.Sequence durationInFrames={100}>
        <AbsoluteFill>
          <OffthreadVideo src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
        </AbsoluteFill>
      </Series.Sequence>
      
      <Series.Sequence durationInFrames={getDuration()}>
      {jsonData[1].text}
      </Series.Sequence>
    </Series>
      
    



    
  );
};
