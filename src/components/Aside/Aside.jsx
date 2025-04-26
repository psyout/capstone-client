import './Aside.scss';
import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import SortByDropDown from '../SortByDropDown/SortByDropDown';
import Footer from '../Footer/Footer';
import Card from '../Card/Card';
import formatHours from './FormatHours';
import formatDrinks from './FormatDrinks';
import formatFood from './FormatFood';
import { options, filters, hoodFilter } from './SearchBy';

const filterAndSort = (features, search, filterBy, hoodBy, sortBy, excludeColumns) => {
	const lowerCasedSearch = search.toLowerCase();
	const formatHoursString = (hours) =>
		Object.entries(hours || {})
			.map(([day, hrs]) => `${day}: ${hrs}`)
			.join(', ');

	return features
		.filter(({ properties }) => !search || Object.keys(properties).some((key) => !excludeColumns.includes(key) && properties[key]?.toString().toLowerCase().includes(lowerCasedSearch)))
		.filter(({ properties }) => !filterBy || properties.category === filterBy)
		.filter(({ properties }) => !hoodBy || properties.neighbourhoods === hoodBy)
		.sort((a, b) =>
			sortBy === 'name' ? a.properties.name.localeCompare(b.properties.name) : sortBy === 'hours' ? formatHoursString(a.properties.hours).localeCompare(formatHoursString(b.properties.hours)) : 0
		);
};

function Aside({ selectedBusiness, setSelectedBusiness, geoJson, search, businesses }) {
	const [sortBy, setSortBy] = useState('');
	const [filterBy, setFilterBy] = useState('');
	const [hoodBy, setHoodBy] = useState('');
	const excludeColumns = ['id'];

	// Ensure geoJson is available before processing
	const sortedFeatures = geoJson?.features ? filterAndSort(geoJson.features, search, filterBy, hoodBy, sortBy, excludeColumns) : [];

	const renderCards = sortedFeatures.map(({ properties }) => {
		// Ensure the business exists in the businesses array
		if (!properties?.name || !businesses.some((b) => b?.name === properties.name)) return null;

		return (
			<Card
				key={properties._id || properties.name}
				title={properties.name}
				address={properties.address}
				contact_number={properties.contact_number}
				time={formatHours(properties.hours)}
				drinks={formatDrinks(properties.drinks)}
				food={formatFood(properties.food)}
				onClick={() => setSelectedBusiness(properties.name)}
				website={properties.website}
				url={properties.url}
				images={properties.images}
				coordinates={properties.coordinates}
				neighbourhoods={properties.neighbourhoods}
				category={properties.category}
			/>
		);
	});

	// Highlight the selected business card
	if (selectedBusiness) {
		const selectedIndex = sortedFeatures.findIndex(({ properties }) => properties.name === selectedBusiness);
		if (selectedIndex > -1) {
			const selectedCard = renderCards.splice(selectedIndex, 1)[0];
			renderCards.unshift(selectedCard);
		}
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
						{renderCards}
					</Masonry>
				</ResponsiveMasonry>
			</ul>
			<Footer />
		</div>
	);
}

export default Aside;
