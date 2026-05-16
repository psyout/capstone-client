import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Aside from '../../components/Aside/Aside';
import LoginForm from '../../components/LoginForm/LoginForm';
import './Home.scss';

import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

import PlaceHolder from '../../assets/images/placeholder.jpg';

function Home() {
	// Selected business from marker or list
	const [selectedBusiness, setSelectedBusiness] = useState(null);

	// All businesses from API
	const [businesses, setBusinesses] = useState([]);

	// GeoJSON data for map markers
	const [geoJson, setGeoJson] = useState(null);

	// Search input state
	const [search, setSearch] = useState('');

	// User current coordinates
	const [userCenter, setUserCenter] = useState(null);

	// Login modal visibility
	const [showLogin, setShowLogin] = useState(false);

	// Reference to map container div
	const mapContainer = useRef(null);

	// Reference to map instance
	const mapRef = useRef(null);

	// Store markers to clean them later
	const markersRef = useRef([]);

	// Fetch businesses from backend API
	const fetchGeoJson = async (signal) => {
		try {
			const isLocalBackend = (process.env.REACT_APP_SERVER_URL || '').includes('localhost');
			const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/locations`, {
				signal,
				...(isLocalBackend ? { credentials: 'include' } : {}),
			});

			const result = await response.json();

			const locations = result.data ?? [];

			// Convert backend data into GeoJSON format
			const geoJsonData = {
				type: 'FeatureCollection',

				features: locations.map((location) => ({
					properties: {
						name: location.name,
						address: location.address,
						coordinates: location.coordinates,
						contact_number: location.contact_number,
						website: location.website,
						hours: location.hours,
						drinks: location.drinks,
						food: location.food,
						neighbourhoods: location.neighbourhoods,
						url: location.url,
						category: location.category,

						// Use placeholder if image missing
						image: location.image || PlaceHolder,
					},

					geometry: {
						type: 'Point',
						coordinates: location.coordinates,
					},
				})),
			};

			// Save GeoJSON for map rendering
			setGeoJson(geoJsonData);

			// Save businesses for Aside component
			setBusinesses(
				locations.map((location) => ({
					...location,
					image: location.image || PlaceHolder,
				})),
			);
		} catch (error) {
			// Ignore aborted requests
			if (error.name !== 'AbortError') {
				console.error('Error fetching GeoJSON data:', error);
			}
		}
	};

	// Create map markers from GeoJSON
	const createMarkers = (geojson) =>
		geojson.features.map((feature) => {
			const { coordinates } = feature.geometry;

			const { name, address } = feature.properties;

			// Marker popup content
			const popup = new mapboxgl.Popup().setHTML(`
				<div>
					<h3>${name}</h3>
					<p><strong>Address:</strong> ${address}</p>
				</div>
			`);

			// Create marker
			const marker = new mapboxgl.Marker({
				color: '#8a8ba6',
			})
				.setLngLat(coordinates)
				.setPopup(popup);

			// Store business name inside marker
			marker.id = name;

			return marker;
		});

	// Initialize map once on component mount
	useEffect(() => {
		// Allows request cancellation on unmount
		const controller = new AbortController();

		// Fetch business data
		fetchGeoJson(controller.signal);

		// Mapbox access token
		mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || 'YOUR_MAPBOX_TOKEN';

		// Check browser WebGL support
		if (!mapboxgl.supported()) {
			alert('Your browser does not support WebGL');

			return () => controller.abort();
		}

		// Create map instance
		mapRef.current = new mapboxgl.Map({
			container: mapContainer.current,

			style: 'mapbox://styles/mapbox/streets-v12',

			// Default location
			center: [-123.114578, 49.285074],

			zoom: 13,
		});

		// Mapbox geolocation control
		const geolocate = new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true,
			},

			trackUserLocation: true,

			showUserLocation: true,
		});

		mapRef.current.addControl(geolocate);

		// Automatically trigger geolocation on map load
		mapRef.current.on('load', () => {
			geolocate.trigger();
		});

		// Save user coordinates when location is found
		geolocate.on('geolocate', (e) => {
			const { latitude, longitude } = e.coords;

			setUserCenter([longitude, latitude]);
		});

		// Cleanup when component unmounts
		return () => {
			controller.abort();

			if (mapRef.current) {
				mapRef.current.remove();

				mapRef.current = null;
			}
		};
	}, []);

	// Render map markers whenever GeoJSON changes
	useEffect(() => {
		if (!geoJson || !mapRef.current) return;

		// Remove old markers before rendering new ones
		markersRef.current.forEach(({ marker, handler }) => {
			marker.getElement().removeEventListener('click', handler);

			marker.remove();
		});

		markersRef.current = [];

		// Create and add new markers
		createMarkers(geoJson).forEach((marker) => {
			// Handle marker click
			const handler = () => setSelectedBusiness(marker.id);

			// Add click listener
			marker.getElement().addEventListener('click', handler);

			// Add marker to map
			marker.addTo(mapRef.current);

			// Store marker reference for cleanup
			markersRef.current.push({
				marker,
				handler,
			});
		});

		// Cleanup markers on rerender
		return () => {
			markersRef.current.forEach(({ marker, handler }) => {
				marker.getElement().removeEventListener('click', handler);

				marker.remove();
			});

			markersRef.current = [];
		};
	}, [geoJson]);

	// Redirect after successful login
	const handleLoginSuccess = () => {
		setShowLogin(false);

		window.location.href = '/admin';
	};

	return (
		<div className='container'>
			<Header
				handleSearchInput={(e) => setSearch(e.target.value)}
				onProfileClick={() => setShowLogin(true)}
			/>

			<Aside
				selectedBusiness={selectedBusiness}
				setSelectedBusiness={setSelectedBusiness}
				geoJson={geoJson}
				search={search}
				businesses={businesses}
				userCenter={userCenter}
			/>

			<div className='desktop-map'>
				<Main mapContainer={mapContainer} />
			</div>

			{/* Login modal */}
			{showLogin && (
				<div className='login-modal-overlay'>
					<div className='login-modal-card'>
						{/* Close modal button */}
						<button
							onClick={() => setShowLogin(false)}
							className='login-modal-close'>
							×
						</button>

						{/* Login form */}
						<LoginForm onSuccess={handleLoginSuccess} />
					</div>
				</div>
			)}
		</div>
	);
}

export default Home;
