import {
	ActionIcon,
	Box,
	Button,
	Flex,
	Group,
	Textarea,
	Text,
	Tooltip,
	Loader,
} from '@mantine/core';
import NavBar from '../components/nav/NavBar';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { useRef, useState } from 'react';
import { IconInfoCircle, IconUpload } from '@tabler/icons-react';
import { createVideo } from '../api';
import { useHistory } from 'react-router-dom';

function UploadPage() {
	const openRef = useRef<() => void>(null);
	const [videoFile, setVideoFile] = useState<FileWithPath[]>([]);
	const [subTitles, setSubTitles] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const placeholder = `WEBVTT

00:00:00.000 --> 00:00:05.000
This is the first subtitle.

00:00:05.000 --> 00:00:10.000
This is the second subtitle.
	`;
	const history = useHistory();

	const handleUpload = async () => {
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append('video', videoFile[0]);
			if (subTitles.length > 0) {
				formData.append('caption', subTitles);
			}
			await createVideo(formData);
			history.push('/');
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	return (
		<Box>
			<NavBar />
			<Flex mt={20} justify={'space-around'}>
				{!loading ? (
					<Box>
						<Dropzone
							openRef={openRef}
							onDrop={(file) => {
								setVideoFile(file);
							}}
							activateOnClick={false}
							styles={{ inner: { pointerEvents: 'all' } }}
						>
							<Group position="center">
								<Button onClick={() => openRef.current && openRef.current()}>
									Select files
								</Button>
							</Group>
							{videoFile[0] && <Text>{videoFile[0]?.name}</Text>}
						</Dropzone>
						<Button
							mt={100}
							color="green"
							leftIcon={<IconUpload size={'1.3rem'} />}
							onClick={handleUpload}
						>
							Upload
						</Button>
					</Box>
				) : (
					<Loader variant="dots" />
				)}

				<Flex direction={'column'} w={'30%'}>
					<Flex w={'100%'} justify={'space-between'}>
						<Text fw={500} fz={15}>
							Enter Subtitles:
						</Text>
						<Tooltip withArrow label="Add text here as .vtt file format">
							<ActionIcon>
								<IconInfoCircle />
							</ActionIcon>
						</Tooltip>
					</Flex>
					<Textarea
						minRows={8}
						autosize
						mb={30}
						placeholder={placeholder}
						value={subTitles}
						onChange={(e) => setSubTitles(e.target.value)}
					/>
				</Flex>
			</Flex>
		</Box>
	);
}

export default UploadPage;
