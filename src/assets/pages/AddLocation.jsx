import React, { useState } from 'react';
import axios from 'axios';
import './AddLocation.scss';

function AddLocation() {
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [coordinates, setCoordinates] = useState({ lng: '', lat: '' });
	const [contactNumber, setContactNumber] = useState('');
	const [website, setWebsite] = useState('');
	const [category, setCategory] = useState('');
	const [neighbourhood, setNeighbourhood] = useState('');
	const [hours, setHours] = useState([{ days: '', from: '', to: '' }]); // Multiple hours
	const [menuDrinks, setMenuDrinks] = useState([{ name: '', price: '' }]);
	const [menuFood, setMenuFood] = useState([{ name: '', price: '' }]);

	// Handle changes for hours
	const handleHoursChange = (index, field, value) => {
		const updatedHours = [...hours];
		updatedHours[index][field] = value;
		setHours(updatedHours);
	};

	const addHours = () => {
		setHours([...hours, { days: '', from: '', to: '' }]);
	};

	const removeHours = (index) => {
		setHours(hours.filter((_, i) => i !== index));
	};

	// Handle changes for menu items
	const handleMenuChange = (menu, setMenu, index, field, value) => {
		const updatedMenu = [...menu];
		if (field === 'price') {
			// Ensure the price always starts with a '$'
			updatedMenu[index][field] = value.startsWith('$') ? value : `$${value}`;
		} else {
			updatedMenu[index][field] = value;
		}
		setMenu(updatedMenu);
	};

	const addMenuItem = (menu, setMenu) => {
		setMenu([...menu, { name: '', price: '' }]);
	};

	const removeMenuItem = (menu, setMenu, index) => {
		setMenu(menu.filter((_, i) => i !== index));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newLocation = {
			name,
			address,
			city,
			province,
			postal_code: postalCode,
			coordinates: [parseFloat(coordinates.lng), parseFloat(coordinates.lat)],
			contact_number: contactNumber,
			website,
			neighbourhood,
			category,
			hours,
			drinks: menuDrinks,
			food: menuFood,
		};

		try {
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/locations`, newLocation, {
				headers: { 'Content-Type': 'application/json' },
			});
			console.log('Location added:', response.data);
			alert('Location added successfully!');

			// Reset form
			setName('');
			setAddress('');
			setCity('');
			setProvince('');
			setPostalCode('');
			setCoordinates({ lng: '', lat: '' });
			setContactNumber('');
			setWebsite('');
			setNeighbourhood('');
			setCategory('');
			setHours([{ days: '', from: '', to: '' }]);
			setMenuDrinks([{ name: '', price: '' }]);
			setMenuFood([{ name: '', price: '' }]);
		} catch (error) {
			console.error('Error adding location:', error);
		}
	};

	return (
		<div className='add-location-form'>
			<h2 className='form-title'>Add New Business</h2>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label>Name:</label>
					<input
						type='text'
						className='form-input'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className='form-group address-group'>
					<label>Address:</label>
					<input
						type='text'
						className='form-input'
						placeholder='Street Address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
					<input
						type='text'
						className='form-input'
						placeholder='City'
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
					/>
					<select
						className='form-select'
						value={province}
						onChange={(e) => setProvince(e.target.value)}
						required>
						<option
							value=''
							disabled>
							Select Province
						</option>
						<option value='AB'>Alberta</option>
						<option value='BC'>British Columbia</option>
						<option value='MB'>Manitoba</option>
						<option value='NB'>New Brunswick</option>
						<option value='NL'>Newfoundland and Labrador</option>
						<option value='NS'>Nova Scotia</option>
						<option value='ON'>Ontario</option>
						<option value='PE'>Prince Edward Island</option>
						<option value='QC'>Quebec</option>
						<option value='SK'>Saskatchewan</option>
						<option value='NT'>Northwest Territories</option>
						<option value='NU'>Nunavut</option>
						<option value='YT'>Yukon</option>
					</select>
					<input
						type='text'
						className='form-input'
						placeholder='Postal Code'
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Neighborhood:</label>
					<select
						className='form-select'
						value={neighbourhood}
						onChange={(e) => setNeighbourhood(e.target.value)}
						required>
						<option
							value=''
							disabled>
							Select Neighborhood
						</option>
						<option value='Downtown'>Downtown</option>
						<option value='Kitsilano'>Kitsilano</option>
						<option value='Mount Pleasant'>Mount Pleasant</option>
						<option value='West End'>West End</option>
						<option value='Yaletown'>Yaletown</option>
						<option value='Strathcona'>Strathcona</option>
						<option value='Gastown'>Gastown</option>
						<option value='Chinatown'>Chinatown</option>
						<option value='Commercial Drive'>Commercial Drive</option>
						<option value='East Vancouver'>East Vancouver</option>
						<option value='South Granville'>South Granville</option>
						<option value='Point Grey'>Point Grey</option>
						<option value='Fair View'>Fair View</option>
						<option value='Dunbar'>Dunbar</option>
					</select>
				</div>
				<div className='form-group'>
					<label>Category:</label>
					<select
						className='form-select'
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						required>
						<option
							value=''
							disabled>
							Select Category
						</option>
						<option value='Restaurant'>Restaurant</option>
						<option value='Bar'>Bar</option>
						<option value='Pub'>Pub</option>
					</select>
				</div>
				<div className='form-group'>
					<label>Coordinates:</label>
					<input
						type='number'
						placeholder='Longitude'
						className='form-input'
						value={coordinates.lng || ''}
						onChange={(e) => setCoordinates({ ...coordinates, lng: e.target.value })}
						required
					/>
					<span style={{ display: 'block', margin: '0.5rem 0' }}></span>
					<input
						type='number'
						placeholder='Latitude'
						className='form-input'
						value={coordinates.lat || ''}
						onChange={(e) => setCoordinates({ ...coordinates, lat: e.target.value })}
						required
					/>
					<a
						style={{ color: 'black', fontSize: '0.8rem', textDecoration: 'underline', fontStyle: 'italic' }}
						href='https://www.latlong.net/'
						target='_blank'
						rel='noopener noreferrer'>
						Need help finding coordinates?
					</a>
				</div>
				<div className='form-group'>
					<label>Contact Number:</label>
					<input
						type='tel'
						inputMode='numeric'
						className='form-input'
						value={contactNumber}
						onChange={(e) => setContactNumber(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label>Website:</label>
					<input
						type='url'
						className='form-input'
						value={website}
						onChange={(e) => setWebsite(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label>Hours of Operation:</label>
					{hours.map((hour, index) => (
						<div
							key={index}
							className='hours-row'>
							<input
								type='text'
								placeholder='Days (Monday - Sunday)'
								className='form-input'
								value={hour.days}
								onChange={(e) => handleHoursChange(index, 'days', e.target.value)}
								required
							/>
							<span style={{ margin: '0.5rem 0', display: 'block' }}></span>

							<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
								<input
									type='time'
									style={{ flexBasis: '2rem' }}
									className='form-input'
									value={hour.from}
									onChange={(e) => handleHoursChange(index, 'from', e.target.value)}
									required
								/>
								<span style={{ color: 'black', fontSize: '0.8rem', fontStyle: 'italic', padding: '0 1rem' }}>to</span>
								<input
									type='time'
									style={{ flexBasis: '2rem' }}
									className='form-input'
									value={hour.to}
									onChange={(e) => handleHoursChange(index, 'to', e.target.value)}
									required
								/>
							</div>
							<button
								type='button'
								onClick={() => removeHours(index)}
								className='remove-button'>
								Remove
							</button>
						</div>
					))}
					<button
						type='button'
						onClick={addHours}
						className='add-button'>
						➕ Add Hours
					</button>
				</div>

				<div className='form-group'>
					<label>Menu (Drinks):</label>
					{menuDrinks.map((item, index) => (
						<div
							key={index}
							className='menu-item'>
							<input
								type='text'
								placeholder='Drink Name'
								className='form-input'
								value={item.name}
								onChange={(e) => handleMenuChange(menuDrinks, setMenuDrinks, index, 'name', e.target.value)}
							/>
							<input
								type='text' // Change to text to allow the '$' symbol
								placeholder='Price'
								className='form-input'
								value={item.price}
								onChange={(e) => handleMenuChange(menuDrinks, setMenuDrinks, index, 'price', e.target.value)}
							/>
							<button
								type='button'
								onClick={() => removeMenuItem(menuDrinks, setMenuDrinks, index)}>
								Remove
							</button>
						</div>
					))}
					<button
						type='button'
						onClick={() => addMenuItem(menuDrinks, setMenuDrinks)}>
						➕ Add Drink
					</button>
				</div>

				<div className='form-group'>
					<label>Menu (Food):</label>
					{menuFood.map((item, index) => (
						<div
							key={index}
							className='menu-item'>
							<input
								type='text'
								placeholder='Food Name'
								className='form-input'
								value={item.name}
								onChange={(e) => handleMenuChange(menuFood, setMenuFood, index, 'name', e.target.value)}
							/>
							<input
								type='text' // Change to text to allow the '$' symbol
								placeholder='Price'
								className='form-input'
								value={item.price}
								onChange={(e) => handleMenuChange(menuFood, setMenuFood, index, 'price', e.target.value)}
							/>
							<button
								type='button'
								onClick={() => removeMenuItem(menuFood, setMenuFood, index)}>
								Remove
							</button>
						</div>
					))}
					<button
						type='button'
						onClick={() => addMenuItem(menuFood, setMenuFood)}>
						➕ Add Food
					</button>
				</div>
				<button
					type='submit'
					className='submit-button'>
					Add Business
				</button>
			</form>
		</div>
	);
}

export default AddLocation;
