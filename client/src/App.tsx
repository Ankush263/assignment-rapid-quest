import { Box, Flex, Grid } from '@mantine/core';
import VideoContainer from './components/videoComponents/VideoContainer';
import NavBar from './components/nav/NavBar';
import { getAllVideos } from './api/index';
import { useEffect, useState } from 'react';

interface Videos {
	_id: string;
	video: string;
	caption: string;
}

function App() {
	const [videos, setVideos] = useState<Videos[]>([]);
	const fetch = async () => {
		const doc = await getAllVideos();
		setVideos(doc.data.data.video);
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<Flex direction={'column'} justify={'center'} align={'center'}>
			<NavBar />
			<Box w={'95%'} mt={20} mb={20}>
				<Grid>
					{videos.map((video) => {
						return (
							<Grid.Col span={4} key={video._id}>
								<VideoContainer video={video.video} caption={video.caption} />
							</Grid.Col>
						);
					})}
				</Grid>
			</Box>
		</Flex>
	);
}

export default App;
