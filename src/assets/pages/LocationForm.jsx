import React from 'react';

function LocationForm({ generalInfo, handleGeneralInfoChange, hours, setHours, menu, handleMenuChange, addMenuItem, removeMenuItem, handleSubmit }) {
	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label>Name:</label>
				<input type="text" className="form-input" value={generalInfo.name} onChange={(e) => handleGeneralInfoChange('name', e.target.value)} required />
			</div>
			<div className="form-group">
				<label>Address:</label>
				<input type="text" className="form-input" value={generalInfo.address} onChange={(e) => handleGeneralInfoChange('address', e.target.value)} required />
			</div>

			<div className="form-group">
				<label>Hours of Operation:</label>
				{hours.map((hour, index) => (
					<div key={index} className="hours-row">
						<input
							type="text"
							placeholder="Days (e.g., Monday - Thursday)"
							className="form-input"
							value={hour.days}
							onChange={(e) => setHours((prev) => prev.map((h, i) => (i === index ? { ...h, days: e.target.value } : h)))}
							required
						/>
						<input
							type="time"
							className="form-input"
							value={hour.from}
							onChange={(e) => setHours((prev) => prev.map((h, i) => (i === index ? { ...h, from: e.target.value } : h)))}
							required
						/>
						<span>to</span>
						<input type="time" className="form-input" value={hour.to} onChange={(e) => setHours((prev) => prev.map((h, i) => (i === index ? { ...h, to: e.target.value } : h)))} required />
						<button type="button" onClick={() => setHours((prev) => prev.filter((_, i) => i !== index))}>
							Remove
						</button>
					</div>
				))}
				<button type="button" onClick={() => setHours((prev) => [...prev, { days: '', from: '', to: '' }])}>
					Add Hours
				</button>
			</div>

			<div className="form-group">
				<label>Menu (Drinks):</label>
				{menu.drinks.map((item, index) => (
					<div key={index} className="menu-item">
						<input type="text" placeholder="Drink Name" className="form-input" value={item.name} onChange={(e) => handleMenuChange('drinks', index, 'name', e.target.value)} />
						<input type="number" placeholder="Price" className="form-input" value={item.price} onChange={(e) => handleMenuChange('drinks', index, 'price', e.target.value)} />
						<button type="button" onClick={() => removeMenuItem('drinks', index)}>
							Remove
						</button>
					</div>
				))}
				<button type="button" onClick={() => addMenuItem('drinks')}>
					Add Drink
				</button>
			</div>

			<div className="form-group">
				<label>Menu (Food):</label>
				{menu.food.map((item, index) => (
					<div key={index} className="menu-item">
						<input type="text" placeholder="Food Name" className="form-input" value={item.name} onChange={(e) => handleMenuChange('food', index, 'name', e.target.value)} />
						<input type="number" placeholder="Price" className="form-input" value={item.price} onChange={(e) => handleMenuChange('food', index, 'price', e.target.value)} />
						<button type="button" onClick={() => removeMenuItem('food', index)}>
							Remove
						</button>
					</div>
				))}
				<button type="button" onClick={() => addMenuItem('food')}>
					Add Food
				</button>
			</div>

			{/* Submit Button */}
			<button type="submit" className="submit-button">
				Add Location
			</button>
		</form>
	);
}

export default LocationForm;
