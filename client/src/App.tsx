import { Box, Flex, Grid } from '@mantine/core';
import VideoContainer from './components/videoComponents/VideoContainer';
import NavBar from './components/nav/NavBar';
import { getAllVideos } from './api/index';
import { useEffect, useState } from 'react';
import { Loader } from '@mantine/core';

interface Videos {
	_id: string;
	video: string;
	caption: string;
}

function App() {
	const [videos, setVideos] = useState<Videos[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const fetch = async () => {
		setLoading(true);
		const doc = await getAllVideos();
		setVideos(doc.data.data.video);
		setLoading(false);
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<Flex direction={'column'} justify={'center'} align={'center'}>
			<NavBar />
			<Box w={'95%'} mt={20} mb={20}>
				{loading ? (
					<Flex justify={'center'} align={'center'} mih={'80vh'}>
						<Loader variant="bars" />
					</Flex>
				) : (
					<Grid>
						{videos.map((video) => {
							return (
								<Grid.Col span={4} key={video._id}>
									<VideoContainer video={video.video} caption={video.caption} />
								</Grid.Col>
							);
						})}
					</Grid>
				)}
			</Box>
		</Flex>
	);
}

export default App;
