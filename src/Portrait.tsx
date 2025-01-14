import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, Audio, staticFile } from 'remotion';
import { words } from './words';
import PortraitCaption from './PortraitCaptions';

export const Portrait: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
	

  return (
    <AbsoluteFill>
			<Audio src={staticFile("Monkeys.mp3")} />
      {words.map((word, index) => (
        <Sequence
          key={index}
          from={Math.ceil(word.start / 1000 * fps)}
          durationInFrames={Math.ceil((word.end - word.start) / 1000 * fps)}
        >
          <PortraitCaption currentTime={frame / fps} word={word} />
        </Sequence>
      ))}

      {/* Add your other Remotion components here */}
    </AbsoluteFill>
  );
};
