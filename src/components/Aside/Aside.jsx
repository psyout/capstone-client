import './Aside.scss';
import Card from '../Card/Card';
import SortByDropDown from '../SortByDropDown/SortByDropDown';
import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const options = [
	{ value: '', label: 'All Results' },
	{ value: 'name', label: 'Name' },
	{ value: 'hours', label: 'Time' },
];

const filters = [
	{ value: '', label: 'All Categories' },
	{ value: 'Seafood', label: 'Seafood' },
	{ value: 'Bars', label: 'Bars' },
	{ value: 'Canadian', label: 'Canadian' },
	{ value: 'Karaoke', label: 'Karaoke' },
	{ value: 'Deli', label: 'Deli' },
	{ value: 'Cideries', label: 'Cideries' },
	{ value: 'Restaurant', label: 'Restaurant' },
	{ value: 'Cocktail', label: 'Cocktail' },
	{ value: 'Mexican', label: 'Mexican' },
	{ value: 'Lounges', label: 'Lounges' },
	{ value: 'Spanish', label: 'Spanish' },
	{ value: 'Australian', label: 'Australian' },
	{ value: 'Pub', label: 'Pub' },
	{ value: 'Gastropub', label: 'Gastropub' },
	{ value: 'Persian', label: 'Persian' },
	{ value: 'Dive Bars', label: 'Dive Bars' },
];

function formatHours(hours) {
	return Object.entries(hours).map(([key, value]) => (
		<div key={key}>
			<strong style={{ fontWeight: '200' }}> {key}:</strong>{' '}
			<strong style={{ fontWeight: '400' }}> {value} </strong>
		</div>
	));
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

function Aside({ selectedBusiness, setSelectedBusiness, geoJson, search, businesses }) {
	const [sortBy, setSortBy] = useState(options[0].value);

	const [filterBy, setFilterBy] = useState(filters[0].value);

	const handleSortByChange = (event) => {
		setSortBy(event.target.value);
	};

	const handleFilterByChange = (event) => {
		setFilterBy(event.target.value);
	};

	// search function
	const excludeColumns = ['id'];

	const filteredFeatures = geoJson.features.filter((feature) => {
		const lowerCasedSearch = search.toLowerCase();
		if (search === '') {
			return true;
		} else {
			return Object.keys(feature.properties).some((key) => {
				return excludeColumns.includes(key)
					? false
					: feature.properties[key].toString().toLowerCase().includes(lowerCasedSearch);
			});
		}
	});

	const sortedFeatures = [...filteredFeatures].sort((a, b) => {
		if (sortBy === 'name') {
			return a.properties.name.localeCompare(b.properties.name);
		} else if (sortBy === 'hours') {
			const aHours = a.properties.hours;
			const bHours = b.properties.hours;
			const aHoursArray = Object.entries(aHours);
			const bHoursArray = Object.entries(bHours);
			const aHoursString = aHoursArray.reduce(
				(acc, [day, hours]) => `${acc}${day}:${hours},`,
				''
			);
			const bHoursString = bHoursArray.reduce(
				(acc, [day, hours]) => `${acc}${day}:${hours},`,
				''
			);
			return aHoursString.localeCompare(bHoursString);
		}
		return 0;
	});

	const filteredFeaturesByCategory = filterBy
		? sortedFeatures.filter((feature) => {
				console.log('feature: ', feature);
				return feature.properties.category.title === filterBy;
		  })
		: sortedFeatures;

	const cards = filteredFeaturesByCategory.map((feature) => {
		const { id, name, website, images } = feature.properties;
		const hours = formatHours(feature.properties.hours);
		const drinks = formatDrinks(feature.properties.drinks);
		const food = formatFood(feature.properties.food);

		const handleClick = () => {
			setSelectedBusiness(name);
		};

		// match id from yelp with id from json
		const matchingBusinessFromYelp = businesses.find((business) => business.name === name);
		// eslint-disable-next-line
		if (!matchingBusinessFromYelp) return;

		return (
			<Card
				key={id}
				title={name}
				address={matchingBusinessFromYelp.location.address1}
				phone={matchingBusinessFromYelp.phone} // Get the phone from Yelp
				images={images}
				time={hours}
				drinks={drinks}
				food={food}
				rating={matchingBusinessFromYelp.rating}
				onClick={handleClick}
				website={website}
				url={matchingBusinessFromYelp.url}
			/>
		);
	});

	// Move selectedBusiness card to the front of the list
	if (selectedBusiness) {
		console.log('selected business: ', selectedBusiness);
		const selectedIndex = sortedFeatures.findIndex(
			(feature) => feature.properties.name === selectedBusiness
		);
		const selectedCard = cards.splice(selectedIndex, 1)[0];
		cards.unshift(selectedCard);
	}

	return (
		<div className="aside">
			<SortByDropDown
				options={options}
				value={sortBy}
				onChange={handleSortByChange}
				filterByValue={filterBy}
				onFilterByChange={handleFilterByChange}
				filters={filters}
			/>
			<>
				<ul className="aside__list">
					<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 550: 2, 950: 2 }}>
						<Masonry containerWidth={800} gutter="30px">
							{cards}
						</Masonry>
					</ResponsiveMasonry>
				</ul>
			</>
		</div>
	);
}

export default Aside;
