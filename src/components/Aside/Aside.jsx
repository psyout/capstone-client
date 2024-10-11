import './Aside.scss';
import Card from '../Card/Card';
import SortByDropDown from '../SortByDropDown/SortByDropDown';
import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import formatHours from './FormatHours';
import formatDrinks from './FormatDrinks';
import formatFood from './FormatFood';

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
	// { value: 'Mount Pleasant', label: 'Mount Pleasant' },
	// { value: 'Gastown', label: 'Gastown' },
	// { value: 'Yaletown', label: 'Yaletown' },
	// { value: 'Commercial Drive', label: 'Commercial Drive' },
	// { value: 'Chinatown', label: 'Chinatown' },
	// { value: 'West End', label: 'West End' },
	// { value: 'Granville Island', label: 'Granville Island' },
	// { value: 'Coal Harbour', label: 'Coal Harbour' },
	// { value: 'False Creek', label: 'False Creek' },
	// { value: 'Robson Street', label: 'Robson Street' },
	// { value: 'Olympic Village', label: 'Olympic Village' },
	// { value: 'South Granville', label: 'South Granville' },
	// { value: 'Davie Village', label: 'Davie Village' },
	// { value: 'Railtown', label: 'Railtown' },
	// { value: 'Strathcona', label: 'Strathcona' },
	// { value: 'Arbutus Ridge', label: 'Arbutus Ridge' },
	// { value: 'Hastings-Sunrise', label: 'Hastings-Sunrise' },
	// { value: 'Champlain Heights', label: 'Champlain Heights' },
	// { value: 'Dunbar-Southlands', label: 'Dunbar-Southlands' },
	// { value: 'Kerrisdale', label: 'Kerrisdale' },
	// { value: 'Killarney', label: 'Killarney' },
	// { value: 'Marpole', label: 'Marpole' },
	// { value: 'Oakridge', label: 'Oakridge' },
	// { value: 'Renfrew-Collingwood', label: 'Renfrew-Collingwood' },
	// { value: 'Riley Park', label: 'Riley Park' },
	// { value: 'Shaughnessy', label: 'Shaughnessy' },
	// { value: 'South Cambie', label: 'South Cambie' },
	// { value: 'Sunset', label: 'Sunset' },
	// { value: 'Victoria-Fraserview', label: 'Victoria-Fraserview' },
	// { value: 'West Point Grey', label: 'West Point Grey' },
];

const filterAndSort = (features, search, filterBy, hoodBy, sortBy, excludeColumns) => {
	const lowerCasedSearch = search.toLowerCase();

	return features
		.filter((feature) =>
			search
				? Object.keys(feature.properties).some((key) =>
						excludeColumns.includes(key)
							? false
							: feature.properties[key]
									.toString()
									.toLowerCase()
									.includes(lowerCasedSearch)
				  )
				: true
		)
		.filter((feature) => (filterBy ? feature.properties.category?.title === filterBy : true))
		.filter((feature) => (hoodBy ? feature.properties.neighbourhoods === hoodBy : true))
		.sort((a, b) => {
			if (sortBy === 'name') return a.properties.name.localeCompare(b.properties.name);
			if (sortBy === 'hours') {
				const formatHoursString = (hours) =>
					Object.entries(hours)
						.map(([day, hours]) => `${day}:${hours}`)
						.join(', ');
				return formatHoursString(a.properties.hours).localeCompare(
					formatHoursString(b.properties.hours)
				);
			}
			return 0;
		});
};

function Aside({ selectedBusiness, setSelectedBusiness, geoJson, search, businesses }) {
	const [sortBy, setSortBy] = useState('');
	const [filterBy, setFilterBy] = useState('');
	const [hoodBy, setHoodBy] = useState('');
	const excludeColumns = ['id'];

	const sortedFeatures = filterAndSort(
		geoJson.features,
		search,
		filterBy,
		hoodBy,
		sortBy,
		excludeColumns
	);

	const cards = sortedFeatures.map((feature) => {
		const { id, name, website, images } = feature.properties;
		const hours = formatHours(feature.properties.hours);
		const drinks = formatDrinks(feature.properties.drinks);
		const food = formatFood(feature.properties.food);

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
				onClick={() => setSelectedBusiness(name)}
				website={website}
				url={matchingBusinessFromYelp.url}
				reviews={matchingBusinessFromYelp.reviews}
			/>
		);
	});

	if (selectedBusiness) {
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
				onChange={(e) => setSortBy(e.target.value)}
				filters={filters}
				filterByValue={filterBy}
				onFilterByChange={(e) => setFilterBy(e.target.value)}
				hoodFilters={hoodFilter}
				hoodByValue={hoodBy}
				onHoodByChange={(e) => setHoodBy(e.target.value)}
			/>
			<ul className="aside__list">
				<ResponsiveMasonry columnsCountBreakPoints={{ 450: 1, 690: 2, 950: 2 }}>
					<Masonry containerWidth={800} gutter="30px">
						{cards}
					</Masonry>
				</ResponsiveMasonry>
			</ul>
		</div>
	);
}

export default Aside;
