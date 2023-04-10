import './Aside.scss';
import placeHolder from '../../assets/images/placeholder.jpg';
import Card from '../Card/Card';
import SortByDropDown from '../SortByDropDown/SortByDropDown';
import { useState } from 'react';

const options = [
	{ value: 'name', label: 'Name' },
	{ value: 'distance', label: 'Distance' },
	{ value: 'price', label: 'Price' },
];

function formatHours(hours) {
	return Object.entries(hours).map(([key, value]) => `${key}: ${value}`);
}

function formatDrinks(drinks) {
	return Object.entries(drinks).map(([key, value]) => (
		<div>
			{key}: <strong>{value}</strong>
		</div>
	));
}

function formatFood(food) {
	return Object.entries(food).map(([key, value]) => (
		<div>
			{key}: <strong>{value}</strong>
		</div>
	));
}

function Aside({ selectedBusiness, setSelectedBusiness, geoJson }) {
	const [sortBy, setSortBy] = useState(options[0].value);

	const handleSortByChange = (event) => {
		setSortBy(event.target.value);
	};

	const sortedFeatures = [...geoJson.features].sort((a, b) => {
		if (sortBy === 'name') {
			return a.properties.name.localeCompare(b.properties.name);
		}
		return 0;
	});

	const cards = sortedFeatures.map((feature) => {
		const { id, name, address, contact_number, website } = feature.properties;
		const hours = formatHours(feature.properties.hours);
		const drinks = formatDrinks(feature.properties.drinks);
		const food = formatFood(feature.properties.food);

		const handleClick = () => {
			setSelectedBusiness(name);
		};

		return (
			<Card
				key={id}
				title={name.slice(0, 25)}
				address={address}
				number={contact_number}
				imageSrc={placeHolder}
				caption={hours}
				drinks={drinks}
				food={food}
				onClick={handleClick}
				website={website}
				name={name}
			/>
		);
	});

	// Move selectedBusiness card to the front of the list
	if (selectedBusiness) {
		const selectedIndex = sortedFeatures.findIndex((feature) => feature.properties.name === selectedBusiness);
		const selectedCard = cards.splice(selectedIndex, 1)[0];
		cards.unshift(selectedCard);
	}

	return (
		<div className='aside'>
			<SortByDropDown options={options} value={sortBy} onChange={handleSortByChange} />
			<ul className='aside__list'>{cards}</ul>
		</div>
	);
}

export default Aside;
