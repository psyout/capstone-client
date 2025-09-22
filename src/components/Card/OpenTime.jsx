import React from 'react';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';

function OpenTime({ time }) {
	const entries = time instanceof Map ? Array.from(time.entries()) : Object.entries(time || {});

	return (
		<span className='restaurant-card__caption'>
			<span className='restaurant-card__caption--container'>
				<AccessTimeTwoToneIcon sx={{ fontSize: '1rem' }} />
				<span className='restaurant-card__caption--title'>Happy Hour Time</span>
			</span>
			{entries.map(([day, hrs], index) => (
				<span
					key={index}
					className='restaurant-card__caption--text'>
					{`${day}: ${hrs}`}
				</span>
			))}
		</span>
	);
}

export default OpenTime;
