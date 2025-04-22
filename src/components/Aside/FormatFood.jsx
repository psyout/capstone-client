// src/utils/formatFood.js
export default function formatFood(food) {
	const entries = food instanceof Map ? Array.from(food.entries()) : Object.entries(food || {});

	return entries.map(([name, price]) => (
		<div key={name}>
			{name}: <strong>{price}</strong>
		</div>
	));
}
