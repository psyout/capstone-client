import React from 'react';
import './SortByDropDown.scss';

function SortByDropDown({
	options,
	value,
	onChange,
	filters,
	filterByValue,
	onFilterByChange,
	hoodFilters,
	hoodByValue,
	onHoodByChange,
}) {
	return (
		<div className="options-dropdown">
			{/* <div className='filter-dropdown'>
				<label className='options-dropdown__label'>Sort by:</label>
				<select className='options-dropdown__select' value={value} onChange={onChange}>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div> */}
			{/* <h3 className="options-dropdown__title">Sort by:</h3> */}
			<div className="filter-dropdown">
				<label className="options-dropdown__label">Filter by:</label>
				<select
					className="options-dropdown__select"
					value={filterByValue}
					onChange={onFilterByChange}>
					{filters.map((filter) => (
						<option key={filter.value} value={filter.value}>
							{filter.label}
						</option>
					))}
				</select>
			</div>

			<div className="filter-dropdown">
				<label className="options-dropdown__label">Look for:</label>
				<select
					className="options-dropdown__select"
					value={hoodByValue}
					onChange={onHoodByChange}>
					{hoodFilters.map((hood) => (
						<option key={hood.value} value={hood.value}>
							{hood.label}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}

export default SortByDropDown;
