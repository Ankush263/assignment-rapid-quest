import { Box } from '@mantine/core';
import ReactPlayer from 'react-player';
import { TrackProps } from 'react-player/file';

function VideoContainer({
	video,
	caption,
}: {
	video: string;
	caption: string;
}) {
	const mySubtitle_arr: TrackProps[] = [
		{
			kind: 'subtitles',
			default: true,
			srcLang: 'en',
			src: `data:text/vtt;charset=utf-8,${caption}`,
			label: '',
		},
	];

	return (
		<Box w={'90%'} h={200} bg={'black'}>
			<ReactPlayer
				url={video}
				config={{
					file: {
						tracks: caption ? mySubtitle_arr : [],
					},
				}}
				muted={true}
				controls={true}
				width={'100%'}
				height={'100%'}
			/>
		</Box>
	);
}

export default VideoContainer;
