import React, { useState, useEffect, useRef } from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
  Series
} from 'remotion';

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
      <Series.Sequence durationInFrames={20}>
      {jsonData[1].text}
      </Series.Sequence>
      </Series>
    



    
  );
};
