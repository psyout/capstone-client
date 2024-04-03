import React from 'react';
import './SortByDropDown.scss';

function SortByDropDown({ options, value, onChange, onFilterByChange, filters, selectedFilterValue }) {
	const filteredOptions = selectedFilterValue === '' ? options : options.filter((option) => option.category === selectedFilterValue);

	const sortedOptions = [...filteredOptions];
	sortedOptions[0] = {
		...sortedOptions[0],
	};
	sortedOptions.sort((a, b) => {
		if (a.value === sortedOptions[0].value) return -1;
		if (b.value === sortedOptions[0].value) return 1;
		return a.label.localeCompare(b.label); // sort by label
	});

	return (
		<div className='options-dropdown'>
			<div>
				<label className='options-dropdown__label'>Sort By:</label>
				<select className='options-dropdown__select' value={value} onChange={onChange}>
					{sortedOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>
			<div className='filter-dropdown'>
				<div>
					<label className='options-dropdown__label'>Filter By:</label>
					<select className='options-dropdown__select' value={selectedFilterValue} onChange={onFilterByChange}>
						{filters.map((filter) => (
							<option key={filter.value} value={filter.value}>
								{filter.label}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}

export default SortByDropDown;
