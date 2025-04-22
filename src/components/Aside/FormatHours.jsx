// src/utils/formatHours.js
export default function formatHours(hours) {
	const entries =
		hours instanceof Map ? Array.from(hours.entries()) : Object.entries(hours || {});

	return entries.map(([days, hrs]) => (
		<div key={days}>
			<span style={{ fontWeight: '300' }}>{days}</span>: {hrs}
		</div>
	));
}
