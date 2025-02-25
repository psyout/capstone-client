import './Aside.scss';
import Card from '../Card/Card';
import SortByDropDown from '../SortByDropDown/SortByDropDown';
import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import formatHours from './FormatHours';
import formatDrinks from './FormatDrinks';
import formatFood from './FormatFood';
import Footer from '../Footer/Footer';
import { options, filters, hoodFilter } from './SearchBy';

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
		const { properties } = feature;
		if (!properties || !properties.name) return null; // Check if properties and name exist

		const { id, name, website, images, address, contact_number, url, rating } = properties;
		const hours = formatHours(properties.hours);
		const drinks = formatDrinks(properties.drinks);
		const food = formatFood(properties.food);

		const matchingBusinessFromYelp = businesses.find(
			(business) => business && business.name === name
		);
		if (!matchingBusinessFromYelp) return null; // Return null if no matching business is found

		return (
			<Card
				key={id}
				title={name}
				address={address}
				contact_number={contact_number}
				images={images}
				time={hours}
				drinks={drinks}
				food={food}
				onClick={() => setSelectedBusiness(name)}
				website={website}
				url={url}
				rating={rating}
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
			<Footer />
		</div>
	);
}

export default Aside;
