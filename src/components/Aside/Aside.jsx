import './Aside.scss';
import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import SortByDropDown from '../SortByDropDown/SortByDropDown';
import Footer from '../Footer/Footer';
import Card from '../Card/Card';
import formatDrinks from './FormatDrinks';
import formatFood from './FormatFood';
import { options, filters, hoodFilter } from './SearchBy';

const haversineKm = ([lng1, lat1], [lng2, lat2]) => {
	const toRad = (deg) => (deg * Math.PI) / 180;
	const R = 6371;
	const dLat = toRad(lat2 - lat1);
	const dLng = toRad(lng2 - lng1);
	const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
	return 2 * R * Math.asin(Math.sqrt(a));
};

const filterAndSort = (features, search, filterBy, hoodBy, sortBy, excludeColumns, userCenter) => {
	const q = search.toLowerCase();
	const hoursStr = (hours) => Object.values(hours || {}).join('|');

	const filtered = features
		.filter(({ properties }) => !search || Object.keys(properties).some((key) => !excludeColumns.includes(key) && properties[key]?.toString().toLowerCase().includes(q)))
		.filter(({ properties }) => !filterBy || properties.category === filterBy)
		.filter(({ properties }) => !hoodBy || properties.neighbourhoods === hoodBy);

	if (userCenter) {
		return filtered
			.map((f) => ({ ...f, __distance: haversineKm(userCenter, f.geometry.coordinates) }))
			.sort((a, b) => a.__distance - b.__distance)
			.map(({ __distance, ...rest }) => rest);
	}

	if (sortBy === 'name') return filtered.sort((a, b) => a.properties.name.localeCompare(b.properties.name));
	if (sortBy === 'hours') return filtered.sort((a, b) => hoursStr(a.properties.hours).localeCompare(hoursStr(b.properties.hours)));
	return filtered;
};

function Aside({ selectedBusiness, setSelectedBusiness, geoJson, search, businesses, userCenter }) {
	const [sortBy, setSortBy] = useState('');
	const [filterBy, setFilterBy] = useState('');
	const [hoodBy, setHoodBy] = useState('');
	const excludeColumns = ['id'];

	// Ensure geoJson is available before processing
	const sortedFeatures = geoJson?.features ? filterAndSort(geoJson.features, search, filterBy, hoodBy, sortBy, excludeColumns, userCenter) : [];

	const renderCards = sortedFeatures
		.filter(({ properties }) => properties?.name && businesses.some((b) => b?.name === properties.name))
		.map(({ properties }) => (
			<Card
				key={properties._id || properties.name}
				title={properties.name}
				address={properties.address}
				contact_number={properties.contact_number}
				time={properties.hours}
				drinks={formatDrinks(properties.drinks)}
				food={formatFood(properties.food)}
				onClick={() => setSelectedBusiness(properties.name)}
				website={properties.website}
				url={properties.url}
				image={properties.image}
			/>
		));

	// Highlight the selected business card
	if (selectedBusiness) {
		const selectedIndex = sortedFeatures.findIndex(({ properties }) => properties.name === selectedBusiness);
		if (selectedIndex > -1) {
			const selectedCard = renderCards.splice(selectedIndex, 1)[0];
			renderCards.unshift(selectedCard);
		}
	}

	return (
		<div className='aside'>
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
			<ul className='aside__list'>
				<ResponsiveMasonry columnsCountBreakPoints={{ 450: 1, 690: 2, 950: 2 }}>
					<Masonry
						containerWidth={800}
						gutter='30px'>
						{renderCards}
					</Masonry>
				</ResponsiveMasonry>
			</ul>
			<Footer />
		</div>
	);
}

export default Aside;
