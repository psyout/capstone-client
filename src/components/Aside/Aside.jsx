import './Aside.scss';
import Card from '../Card/Card';
import SortByDropDown from '../SortByDropDown/SortByDropDown';
import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const options = [
	{ value: '', label: 'Results' },
	{ value: 'name', label: 'Name' },
	{ value: 'hours', label: 'Time' },
];

const filters = [
	{ value: '', label: 'Categories' },
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

const hoodFilter = [
	{ value: '', label: 'Neighbourhood' },
	{ value: 'Kitsilano', label: 'Kitsilano' },
	{ value: 'Downtown', label: 'Downtown' },
	// add other neighbourhoods here...
];

function formatHours(hours) {
	return Object.entries(hours).map(([key, value]) => (
		<div key={key}>
			<strong style={{ fontWeight: '200' }}> {key}:</strong> <strong style={{ fontWeight: '400' }}> {value} </strong>
		</div>
	));
}

function formatDrinks(drinks) {
	return Object.entries(drinks).map(([key, value]) => (
		<div key={key}>
			{key}: <strong>{value}</strong>
		</div>
	));
}

function formatFood(food) {
	return Object.entries(food).map(([key, value]) => (
		<div key={key}>
			{key}: <strong>{value}</strong>
		</div>
	));
}

function Aside({ selectedBusiness, setSelectedBusiness, geoJson, search, businesses }) {
	const [sortBy, setSortBy] = useState(options[0].value);
	const [filterBy, setFilterBy] = useState(filters[0].value);
	const [hoodBy, setHoodBy] = useState(hoodFilter[0].value);

	const handleSortByChange = (event) => {
		setSortBy(event.target.value);
	};

	const handleFilterByChange = (event) => {
		setFilterBy(event.target.value);
	};

	const handleHoodByChange = (event) => {
		setHoodBy(event.target.value);
	};

	// Exclude certain columns from search
	const excludeColumns = ['id'];

	// Filter based on search query, category, and neighbourhood
	const filteredFeatures = geoJson.features
		.filter((feature) => {
			const lowerCasedSearch = search.toLowerCase();
			if (search === '') return true;
			return Object.keys(feature.properties).some((key) => {
				return excludeColumns.includes(key) ? false : feature.properties[key].toString().toLowerCase().includes(lowerCasedSearch);
			});
		})
		.filter((feature) => {
			if (filterBy && feature.properties.category) {
				return feature.properties.category.title === filterBy;
			}
			return true;
		})
		.filter((feature) => {
			if (hoodBy && feature.properties.neighbourhoods) {
				return feature.properties.neighbourhoods === hoodBy;
			}
			return true;
		});

	const sortedFeatures = [...filteredFeatures].sort((a, b) => {
		if (sortBy === 'name') {
			return a.properties.name.localeCompare(b.properties.name);
		} else if (sortBy === 'hours') {
			const aHoursString = Object.entries(a.properties.hours)
				.map(([day, hours]) => `${day}:${hours}`)
				.join(', ');
			const bHoursString = Object.entries(b.properties.hours)
				.map(([day, hours]) => `${day}:${hours}`)
				.join(', ');
			return aHoursString.localeCompare(bHoursString);
		}
		return 0;
	});

	const cards = sortedFeatures.map((feature) => {
		const { id, name, website, images } = feature.properties;
		const hours = formatHours(feature.properties.hours);
		const drinks = formatDrinks(feature.properties.drinks);
		const food = formatFood(feature.properties.food);

		const handleClick = () => {
			setSelectedBusiness(name);
		};

		const matchingBusinessFromYelp = businesses.find((business) => business.name === name);
		if (!matchingBusinessFromYelp) return null;

		return (
			<Card
				key={id}
				title={name}
				address={matchingBusinessFromYelp.location.address1}
				phone={matchingBusinessFromYelp.phone}
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

	if (selectedBusiness) {
		const selectedIndex = sortedFeatures.findIndex((feature) => feature.properties.name === selectedBusiness);
		const selectedCard = cards.splice(selectedIndex, 1)[0];
		cards.unshift(selectedCard);
	}

	return (
		<div className='aside'>
			<SortByDropDown
				options={options}
				value={sortBy}
				onChange={handleSortByChange}
				filters={filters}
				filterByValue={filterBy}
				onFilterByChange={handleFilterByChange}
				hoodFilters={hoodFilter}
				hoodByValue={hoodBy}
				onHoodByChange={handleHoodByChange}
			/>
			<ul className='aside__list'>
				<ResponsiveMasonry columnsCountBreakPoints={{ 450: 1, 690: 2, 950: 2 }}>
					<Masonry containerWidth={800} gutter='30px'>
						{cards}
					</Masonry>
				</ResponsiveMasonry>
			</ul>
		</div>
	);
}

export default Aside;
