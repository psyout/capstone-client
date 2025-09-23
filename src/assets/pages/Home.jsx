import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Aside from '../../components/Aside/Aside';
import LoginForm from '../../components/LoginForm/LoginForm';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import PlaceHolder from '../../assets/images/placeholder.jpg';

function Home() {
	const [selectedBusiness, setSelectedBusiness] = useState(null);
	const [businesses, setBusinesses] = useState([]);
	const [geoJson, setGeoJson] = useState(null);
	const [search, setSearch] = useState('');
	const [userCenter, setUserCenter] = useState(null);
	const [showLogin, setShowLogin] = useState(false);
	const mapContainer = useRef(null);
	const mapRef = useRef({});
	const markersRef = useRef([]);

	// Fetch GeoJSON data from the server
	const fetchGeoJson = async (signal) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/locations`, { signal });
			const result = await response.json();
			const locations = result.data ?? [];

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
						image: location.image || PlaceHolder,
					},
					geometry: {
						type: 'Point',
						coordinates: location.coordinates,
					},
				})),
			};

			setGeoJson(geoJsonData);

			// Ensure each business has an image
			const businessesWithImage = locations.map((location) => ({
				...location,
				image: location.image || PlaceHolder,
			}));
			setBusinesses(businessesWithImage);
		} catch (error) {
			if (error.name !== 'AbortError') {
				console.error('Error fetching GeoJSON data:', error);
			}
		}
	};

	// Get markers from the GeoJSON data
	const getMarkersFromGeoJson = (geojson) =>
		geojson.features.map((feature) => {
			const { coordinates } = feature.geometry;
			const { name, address } = feature.properties;
			const popup = new mapboxgl.Popup().setHTML(`
				<div>
					<h3>${name}</h3>
					<p><strong>Address:</strong> ${address}</p>
				</div>
			`);
			const marker = new mapboxgl.Marker({ color: '#8a8ba6' }).setLngLat(coordinates).setPopup(popup);
			marker.id = name;
			return marker;
		});

	// Request location permission on page load
	useEffect(() => {
		if (navigator.geolocation && window.isSecureContext) {
			navigator.geolocation.getCurrentPosition(
				({ coords: { latitude, longitude } }) => {
					setUserCenter([longitude, latitude]);
				},
				(error) => {
					console.log('Location access denied or unavailable:', error.message);
					// Try with less strict options as fallback
					navigator.geolocation.getCurrentPosition(
						({ coords: { latitude, longitude } }) => {
							setUserCenter([longitude, latitude]);
						},
						() => {}, // Silent fail on second attempt
						{ enableHighAccuracy: false, timeout: 5000, maximumAge: 600000 }
					);
				},
				{ enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
			);
		} else {
			console.log('Geolocation not available - requires HTTPS on mobile');
		}
	}, []);

	// Add cleanup at the end of the effect that creates the map
	useEffect(() => {
		const controller = new AbortController();
		fetchGeoJson(controller.signal);
		mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

		if (!mapboxgl.supported()) {
			alert('Your browser does not support WebGL');
			return () => controller.abort();
		}

		// Initialize map with fallback center
		mapRef.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [-123.114578, 49.285074], // Vancouver fallback
			zoom: 14,
		});

		const geolocate = new mapboxgl.GeolocateControl({
			positionOptions: { enableHighAccuracy: true },
			trackUserLocation: true,
			showUserLocation: true,
		});
		mapRef.current.addControl(geolocate);

		geolocate.on('geolocate', (e) => {
			const { latitude, longitude } = e.coords;
			mapRef.current.setCenter([longitude, latitude]);
			mapRef.current.setZoom(15);
			setUserCenter([longitude, latitude]);
		});

		return () => {
			controller.abort();
			if (mapRef.current && mapRef.current.remove) {
				mapRef.current.remove();
			}
		};
	}, []);

	useEffect(() => {
		if (!geoJson) return;

		// Remove existing markers and listeners
		markersRef.current.forEach(({ marker, handler }) => {
			const el = marker.getElement();
			el && handler && el.removeEventListener('click', handler);
			marker.remove();
		});
		markersRef.current = [];

		// Add new markers
		getMarkersFromGeoJson(geoJson).forEach((marker) => {
			const handler = () => setSelectedBusiness(marker.id);
			marker.getElement().addEventListener('click', handler);
			marker.addTo(mapRef.current);
			markersRef.current.push({ marker, handler });
		});

		return () => {
			markersRef.current.forEach(({ marker, handler }) => {
				const el = marker.getElement();
				el && handler && el.removeEventListener('click', handler);
				marker.remove();
			});
			markersRef.current = [];
		};
	}, [geoJson]);

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
			<Main mapContainer={mapContainer} />

			{showLogin && (
				<div
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0,0,0,0.7)',
						backdropFilter: 'blur(8px)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						zIndex: 1000,
						animation: 'fadeIn 0.3s ease-out',
					}}>
					<div
						style={{
							position: 'relative',
							maxWidth: '450px',
							width: '90%',
							animation: 'slideIn 0.3s ease-out',
						}}>
						<button
							onClick={() => setShowLogin(false)}
							style={{
								position: 'absolute',
								top: '-40px',
								right: '10px',
								background: 'rgba(255,255,255,0.9)',
								border: 'none',
								borderRadius: '50%',
								width: '32px',
								height: '32px',
								fontSize: '1.2rem',
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
								transition: 'all 0.3s ease',
								zIndex: 10,
							}}
							onMouseEnter={(e) => {
								e.target.style.background = 'rgba(255,255,255,1)';
								e.target.style.transform = 'scale(1.1)';
							}}
							onMouseLeave={(e) => {
								e.target.style.background = 'rgba(255,255,255,0.9)';
								e.target.style.transform = 'scale(1)';
							}}>
							×
						</button>
						<LoginForm onSuccess={handleLoginSuccess} />
					</div>
				</div>
			)}
		</div>
	);
}

export default Home;
