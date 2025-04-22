// src/utils/formatDrinks.js
export default function formatDrinks(drinks) {
	// if it's a Mongoose Map, get its entries; otherwise, plain Object.entries
	const entries =
		drinks instanceof Map ? Array.from(drinks.entries()) : Object.entries(drinks || {});

	return entries.map(([name, price]) => (
		<div key={name}>
			{name}: <strong>{price}</strong>
		</div>
	));
}
