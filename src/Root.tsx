import {Composition} from 'remotion';
import {Intro} from './Intro';
import {Logo} from './Intro/Logo';
import {GuessTheWordQuiz} from './GuessTheWordQuiz';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Intro"
        component={Intro}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          titleText: 'Welcome to the Intro',
          titleColor: 'black',
        }}
      />
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Guess-the-Word"
        component={GuessTheWordQuiz}
        durationInFrames={10 * 240}
        fps={30}
        width={1920}
        height={1080}
      />
        
    </>
  );
};
