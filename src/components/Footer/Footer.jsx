import React from 'react';
import { Typography, Link } from '@mui/material';
import { grey } from '@mui/material/colors';

function Footer() {
	return (
		<footer
			style={{
				textAlign: 'center',
				padding: '1rem',
				color: grey[60],
				marginTop: '2rem',
			}}>
			<Typography variant="body2">
				{'© Made by '}
				<Link
					href="https://felipegonzalez.io"
					target="_blank"
					rel="noopener noreferrer"
					color="primary"
					style={{ textDecoration: 'none' }}>
					Felipe
				</Link>
				{'  in Vancouver, BC '}
				{new Date().getFullYear()}
			</Typography>
		</footer>
	);
}

export default Footer;
