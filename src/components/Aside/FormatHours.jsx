import React from 'react';

function formatHours(hours) {
	return Object.entries(hours).map(([key, value]) => (
		<div key={key}>
			<strong style={{ fontWeight: '200' }}> {key}:</strong>{' '}
			<strong style={{ fontWeight: '400' }}> {value} </strong>
		</div>
	));
}

export default formatHours;
