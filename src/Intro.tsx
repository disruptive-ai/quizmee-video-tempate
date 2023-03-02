import {spring} from 'remotion';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { IntroTitle } from './Intro/IntroTitle';
import {Theme} from './Intro/Theme';
import {quiz} from './quiz'

export const Intro: React.FC<{
	titleText: string;
	titleColor: string;
	titlePosition: number;
}> = ({titleText, titleColor, titlePosition}) => {
	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();

	// Animate from 0 to 1 after 25 frames
	const logoTranslationProgress = spring({
		frame: frame - 25,
		fps,
		config: {
			damping: 100,
		},
	});

	// Move the logo up by 150 pixels once the transition starts
	const logoTranslation = interpolate(
		logoTranslationProgress,
		[0, 1],
		[0, -150]
	);

	// Fade out the animation at the end
	const opacity = interpolate(
		frame,
		[durationInFrames - 25, durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	// A <AbsoluteFill> is just an absolutely positioned <div>!
	return (
		<AbsoluteFill style={{backgroundColor: 'white'}}>
			<AbsoluteFill style={{opacity}}>
				<Sequence>
					<IntroTitle title={quiz.title}/>
				</Sequence>
				<Sequence>
					<Theme theme={quiz.theme}/>
				</Sequence>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
