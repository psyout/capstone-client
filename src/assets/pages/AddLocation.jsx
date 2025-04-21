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
	const [neighborhood, setNeighborhood] = useState('');
	const [image, setImage] = useState(null);
	const [hours, setHours] = useState({ from: '', to: '' });
	const [menuDrinks, setMenuDrinks] = useState([{ name: '', price: '' }]);
	const [menuFood, setMenuFood] = useState([{ name: '', price: '' }]);

	const handleMenuChange = (menu, setMenu, index, field, value) => {
		const updatedMenu = [...menu];
		updatedMenu[index][field] = value;
		setMenu(updatedMenu);
	};

	const addMenuItem = (menu, setMenu) => {
		setMenu([...menu, { name: '', price: '' }]);
	};

	const removeMenuItem = (menu, setMenu, index) => {
		const updatedMenu = menu.filter((_, i) => i !== index);
		setMenu(updatedMenu);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newLocation = {
			name,
			address,
			city,
			province,
			postalCode,
			coordinates: [parseFloat(coordinates.lng), parseFloat(coordinates.lat)],
			contactNumber,
			website,
			neighborhood,
			hours,
			menu: {
				drinks: menuDrinks,
				food: menuFood,
			},
		};

		const formData = new FormData();
		formData.append('data', JSON.stringify(newLocation));

		try {
			const response = await axios.post('http://localhost:5000/api/locations', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			console.log('Location added:', response.data);
			// Reset the form
			setName('');
			setAddress('');
			setCity('');
			setProvince('');
			setPostalCode('');
			setCoordinates({ lng: '', lat: '' });
			setContactNumber('');
			setWebsite('');
			setNeighborhood('');
			setImage(null);
			setHours({ from: '', to: '' });
			setMenuDrinks([{ name: '', price: '' }]);
			setMenuFood([{ name: '', price: '' }]);
		} catch (error) {
			console.error('Error adding location:', error);
		}
	};

	return (
		<div className="add-location-form">
			<h2 className="form-title">Add New Location</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Name:</label>
					<input
						type="text"
						className="form-input"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className="form-group address-group">
					<label>Address:</label>
					<input
						type="text"
						className="form-input"
						placeholder="Street Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
					<input
						type="text"
						className="form-input"
						placeholder="City"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
					/>
					<select
						className="form-select"
						value={province}
						onChange={(e) => setProvince(e.target.value)}
						required>
						<option value="" disabled>
							Select Province
						</option>
						<option value="AB">Alberta</option>
						<option value="BC">British Columbia</option>
						<option value="MB">Manitoba</option>
						<option value="NB">New Brunswick</option>
						<option value="NL">Newfoundland and Labrador</option>
						<option value="NS">Nova Scotia</option>
						<option value="ON">Ontario</option>
						<option value="PE">Prince Edward Island</option>
						<option value="QC">Quebec</option>
						<option value="SK">Saskatchewan</option>
						<option value="NT">Northwest Territories</option>
						<option value="NU">Nunavut</option>
						<option value="YT">Yukon</option>
					</select>
					<input
						type="text"
						className="form-input"
						placeholder="Postal Code"
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label>Neighborhood:</label>
					<select
						className="form-select"
						value={neighborhood}
						onChange={(e) => setNeighborhood(e.target.value)}
						required>
						<option value="" disabled>
							Select Neighborhood
						</option>
						<option value="Downtown">Downtown</option>
						<option value="Kitsilano">Kitsilano</option>
						<option value="Mount Pleasant">Mount Pleasant</option>
						<option value="West End">West End</option>
						<option value="Yaletown">Yaletown</option>\{' '}
						<option value="North Vancouver">North Vancouver</option>\{' '}
					</select>
				</div>
				<div className="form-group">
					<label>Coordinates:</label>
					<input
						type="number"
						placeholder="Latitude"
						className="form-input"
						value={coordinates.lat}
						onChange={(e) => setCoordinates({ ...coordinates, lat: e.target.value })}
						required
					/>
					<input
						type="number"
						placeholder="Longitude"
						className="form-input"
						value={coordinates.lng}
						onChange={(e) => setCoordinates({ ...coordinates, lng: e.target.value })}
						required
					/>
					<a
						style={{ color: 'black', fontSize: '0.8rem', textDecoration: 'underline' }}
						href="https://www.latlong.net/"
						target="_blank"
						rel="noopener noreferrer">
						Need help finding coordinates?
					</a>
				</div>
				<div className="form-group">
					<label>Contact Number:</label>
					<input
						type="text"
						className="form-input"
						value={contactNumber}
						onChange={(e) => setContactNumber(e.target.value)}
						pattern="[0-9]*"
						onKeyDown={(e) => {
							if (
								!/[0-9]/.test(e.key) &&
								e.key !== 'Backspace' &&
								e.key !== 'Delete' &&
								e.key !== 'ArrowLeft' &&
								e.key !== 'ArrowRight'
							) {
								e.preventDefault();
							}
						}}
					/>
				</div>
				<div className="form-group">
					<label>Website:</label>
					<input
						type="url"
						className="form-input"
						value={website}
						onChange={(e) => setWebsite(e.target.value)}
					/>
				</div>

				<div className="form-group">
					<label>Image:</label>
					<input
						type="file"
						className="form-input"
						onChange={(e) => setImage(e.target.files[0])}
					/>
				</div>
				<div className="form-group">
					<label>Hours of Operation:</label>
					<div className="hours-row">
						<input
							type="time"
							className="form-input"
							value={hours.from}
							onChange={(e) => setHours({ ...hours, from: e.target.value })}
							required
						/>
						<span>to</span>
						<input
							type="time"
							className="form-input"
							value={hours.to}
							onChange={(e) => setHours({ ...hours, to: e.target.value })}
							required
						/>
					</div>
				</div>
				<div className="form-group">
					<label>Menu (Drinks):</label>
					{menuDrinks.map((item, index) => (
						<div key={index} className="menu-item">
							<input
								type="text"
								className="form-input"
								placeholder="Drink Name"
								value={item.name}
								onChange={(e) =>
									handleMenuChange(
										menuDrinks,
										setMenuDrinks,
										index,
										'name',
										e.target.value
									)
								}
							/>
							<input
								type="number"
								className="form-input"
								placeholder="Price"
								value={item.price}
								onChange={(e) =>
									handleMenuChange(
										menuDrinks,
										setMenuDrinks,
										index,
										'price',
										e.target.value
									)
								}
							/>
							<button
								type="button"
								className="remove-button"
								onClick={() => removeMenuItem(menuDrinks, setMenuDrinks, index)}>
								Remove
							</button>
						</div>
					))}
					<button
						type="button"
						className="add-button"
						onClick={() => addMenuItem(menuDrinks, setMenuDrinks)}>
						Add Drink
					</button>
				</div>
				<div className="form-group">
					<label>Menu (Food):</label>
					{menuFood.map((item, index) => (
						<div key={index} className="menu-item">
							<input
								type="text"
								className="form-input"
								placeholder="Food Name"
								value={item.name}
								onChange={(e) =>
									handleMenuChange(
										menuFood,
										setMenuFood,
										index,
										'name',
										e.target.value
									)
								}
							/>
							<input
								type="number"
								className="form-input"
								placeholder="Price"
								value={item.price}
								onChange={(e) =>
									handleMenuChange(
										menuFood,
										setMenuFood,
										index,
										'price',
										e.target.value
									)
								}
							/>
							<button
								type="button"
								className="remove-button"
								onClick={() => removeMenuItem(menuFood, setMenuFood, index)}>
								Remove
							</button>
						</div>
					))}
					<button
						type="button"
						className="add-button"
						onClick={() => addMenuItem(menuFood, setMenuFood)}>
						Add Food
					</button>
				</div>
				<button type="submit" className="submit-button">
					Add Location
				</button>
			</form>
		</div>
	);
}

export default AddLocation;
