import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLOR_1, FONT_FAMILY} from './constants';

const theme: React.CSSProperties = {
	fontFamily: FONT_FAMILY,
	fontSize: 40,
	textAlign: 'center',
	position: 'absolute',
	bottom: 140,
	width: '100%',
};

const codeStyle: React.CSSProperties = {
	color: COLOR_1,
};

export const Theme: React.FC = () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 30], [0, 1]);
	return (
		<div style={{...theme, opacity}}>
			<code style={codeStyle}>Theme</code>
		</div>
	);
};
