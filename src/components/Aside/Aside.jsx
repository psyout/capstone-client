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
	const formatHoursString = (hours) =>
		Object.entries(hours || {})
			.map(([day, hrs]) => `${day}:${hrs}`)
			.join(', ');

	return features
		.filter(({ properties }) =>
			search
				? Object.keys(properties).some(
						(key) =>
							!excludeColumns.includes(key) &&
							properties[key]?.toString().toLowerCase().includes(lowerCasedSearch)
				  )
				: true
		)
		.filter(({ properties }) => (filterBy ? properties.category?.title === filterBy : true))
		.filter(({ properties }) => (hoodBy ? properties.neighbourhoods === hoodBy : true))
		.sort((a, b) =>
			sortBy === 'name'
				? a.properties.name.localeCompare(b.properties.name)
				: sortBy === 'hours'
				? formatHoursString(a.properties.hours).localeCompare(
						formatHoursString(b.properties.hours)
				  )
				: 0
		);
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

	const cards = sortedFeatures.map(({ properties }) => {
		if (!properties?.name) return null;

		const { id, name, website, images, address, contact_number, url, rating } = properties;
		const hours = formatHours(properties.hours);
		const drinks = formatDrinks(properties.drinks);
		const food = formatFood(properties.food);

		if (!businesses.some((b) => b?.name === name)) return null;

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
			({ properties }) => properties.name === selectedBusiness
		);
		if (selectedIndex > -1) cards.unshift(cards.splice(selectedIndex, 1)[0]);
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
