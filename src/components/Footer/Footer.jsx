import React from 'react';
import { Typography, Link } from '@mui/material';
import { grey } from '@mui/material/colors';

function Footer() {
	return (
		<footer
			style={{
				textAlign: 'center',
				padding: '1rem',
				color: grey[10],
				marginTop: 'auto',
			}}>
			<Typography variant='body2'>
				{'© Made by '}
				<Link
					href='https://felipegonzalez.io'
					target='_blank'
					rel='noopener noreferrer'
					sx={{
						textDecoration: 'none',
						fontWeight: 'bold',
						cursor: 'pointer',
						display: 'inline',
						color: 'grey.900',
						'&:hover': {
							textDecoration: 'underline',
						},
					}}>
					Felipe
				</Link>
				{'  in Vancouver, BC '}
				{new Date().getFullYear()}
			</Typography>
		</footer>
	);
}

export default Footer;
