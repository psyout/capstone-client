function formatDrinks(drinks) {
	return Object.entries(drinks).map(([key, value]) => (
		<div key={key}>
			{key}: <strong>{value}</strong>
		</div>
	));
}

export default formatDrinks;
