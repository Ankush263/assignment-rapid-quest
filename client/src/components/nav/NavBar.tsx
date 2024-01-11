import { Flex } from '@mantine/core';
import { Link } from 'react-router-dom';

function NavBar() {
	return (
		<Flex w={'100%'} sx={{ borderBottom: '1px solid black' }}>
			<Link
				to={'/'}
				style={{ textDecoration: 'none', color: 'black', marginLeft: '20px' }}
			>
				<p style={{ fontWeight: 500, fontSize: '17px' }}>Home</p>
			</Link>
			<Link
				to={'/upload'}
				style={{ textDecoration: 'none', color: 'black', marginLeft: '20px' }}
			>
				<p style={{ fontWeight: 500, fontSize: '17px' }}>Upload</p>
			</Link>
		</Flex>
	);
}

export default NavBar;
