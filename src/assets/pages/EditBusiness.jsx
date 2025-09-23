import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddLocation from './AddLocation';
import './EditBusiness.scss';

function EditBusiness() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [business, setBusiness] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchBusiness();
	}, [id]); // eslint-disable-line react-hooks/exhaustive-deps

	const fetchBusiness = async () => {
		try {
			const url = `${process.env.REACT_APP_SERVER_URL}/api/locations`;
			console.log('Fetching all businesses from:', url);
			const response = await fetch(url);
			console.log('Response status:', response.status);

			if (!response.ok) {
				throw new Error(`Failed to fetch businesses (${response.status})`);
			}
			const result = await response.json();
			console.log('API response:', result);

			// Find the business with matching ID
			const businesses = result.data || [];
			const business = businesses.find((b) => b._id === id || b.id === id);

			if (!business) {
				throw new Error('Business not found');
			}

			console.log('Found business:', business);
			setBusiness(business);
		} catch (error) {
			console.error('Error fetching business:', error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleUpdateSuccess = () => {
		navigate('/admin');
	};

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '200px',
					fontSize: '1.2rem',
				}}>
				Loading business data...
			</div>
		);
	}

	if (error) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '200px',
					fontSize: '1.2rem',
				}}>
				<p>Error: {error}</p>
				<button
					onClick={() => navigate('/admin')}
					style={{
						padding: '0.5rem 1rem',
						backgroundColor: '#2b2840',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
						marginTop: '1rem',
					}}>
					Back to Admin
				</button>
			</div>
		);
	}

	if (!business) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '200px',
					fontSize: '1.2rem',
				}}>
				Business not found
			</div>
		);
	}

	return (
		<div className='edit-business-container'>
			<header className='edit-business-header'>
				<h1>{business.name}</h1>
				<button
					onClick={() => navigate('/admin')}
					className='btn-secondary'>
					← Back to Admin
				</button>
			</header>
			<AddLocation
				editMode={true}
				mode='edit'
				existingBusiness={business}
				onSuccess={handleUpdateSuccess}
			/>
		</div>
	);
}

export default EditBusiness;
