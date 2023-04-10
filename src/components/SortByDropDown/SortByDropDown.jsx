import React from 'react';
import PropTypes from 'prop-types';
import './SortByDropDown.scss';

function SortByDropDown({ options, value, onChange, filterByValue, onFilterByChange }) {
	const sortedOptions = [...options];
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
				<label className='options-dropdown__label'>Filter By:</label>
				<div>
					<input type='radio' id='open' name='filterBy' value='open' checked={filterByValue === 'open'} onChange={onFilterByChange} />
					<label className='options-dropdown__label--label' htmlFor='option1'>
						Open
					</label>
				</div>
				<div>
					<input
						type='radio'
						id='closed'
						name='filterBy'
						value='closed'
						checked={filterByValue === 'closed'}
						onChange={onFilterByChange}
					/>
					<label className='options-dropdown__label--label' htmlFor='option2'>
						Closed
					</label>
				</div>
			</div>
		</div>
	);
}

SortByDropDown.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	filterByValue: PropTypes.string.isRequired,
	onFilterByChange: PropTypes.func.isRequired,
};

export default SortByDropDown;
