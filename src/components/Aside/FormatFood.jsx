function formatFood(food) {
	return Object.entries(food).map(([key, value]) => (
		<div key={key}>
			{key}: <strong>{value}</strong>
		</div>
	));
}

export default formatFood;
