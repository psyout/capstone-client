// src/utils/formatHours.js
export default function formatHours(hours) {
	const entries = hours instanceof Map ? Array.from(hours.entries()) : Object.entries(hours || {});

	return entries.map(([days, hrs]) => (
		<div key={days}>
			<span style={{ fontWeight: '400' }}>{days}</span>:<span style={{ fontWeight: '300' }}> {hrs}</span>
		</div>
	));
}
