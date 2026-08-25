import type {FC} from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

type Props = {
	title: string;
};

export const HelloWorld: FC<Props> = ({title}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = spring({
		fps,
		frame,
		config: {damping: 200},
	});

	const opacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0b0b0f',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					opacity,
					transform: `scale(${scale})`,
					fontSize: 100,
					fontWeight: 700,
					color: 'white',
					fontFamily: 'sans-serif',
				}}
			>
				{title}
			</div>
		</AbsoluteFill>
	);
};
