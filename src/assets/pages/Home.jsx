import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Aside from '../../components/Aside/Aside';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { GeolocateControl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl-controls/lib/controls.css';

function Home() {
	const [selectedBusiness, setSelectedBusiness] = useState(null);
	const [selectedCard, setSelectedCard] = useState([]);
	const [businesses, setBusinesses] = useState([]);
	const [geoJson, setGeoJson] = useState(null); // State to store fetched GeoJSON data

	// search
	const [search, setSearch] = useState('');
	const handleSearchInput = (event) => {
		const { value } = event.target;
		setSearch(value);
	};

	const mapContainer = useRef(null);
	const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

	const mapRef = useRef({});

	// Fetch GeoJSON data from the server
	const fetchGeoJson = async () => {
		try {
			const response = await fetch('https://vansippy-locations.onrender.com/api/locations'); // Replace with your API endpoint
			const result = await response.json(); // The full response object
			const locations = result.data; // Access the 'data' property that contains the array

			// Transform the data into GeoJSON format
			const geoJsonData = {
				type: 'FeatureCollection',
				features: locations.map((location) => ({
					// Use the location ID as the feature ID
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
					},
					geometry: {
						type: 'Point',
						coordinates: location.coordinates,
					},
				})),
			};

			setGeoJson(geoJsonData);
			setBusinesses(locations); // Set businesses directly from the server response
		} catch (error) {
			console.error('Error fetching GeoJSON data:', error);
		}
	};

	// Get markers from the GeoJSON data
	const getMarkersFromGeoJson = (geojson) => {
		const markers = geojson.features.map((feature) => {
			const { coordinates } = feature.geometry; // Use geometry.coordinates for marker placement
			const { name, address } = feature.properties; // Extract additional properties
			const color = '#8a8ba6'; // Marker color

			// Create a popup with relevant information
			const popup = new mapboxgl.Popup().setHTML(`
				<div>
					<h3>${name}</h3>
					<p><strong>Address:</strong> ${address}</p>
				</div>
			`);

			// Create a marker and attach the popup
			const marker = new mapboxgl.Marker({ color }).setLngLat(coordinates).setPopup(popup);

			marker.id = name; // Use the name as the marker ID
			return marker;
		});
		return markers;
	};

	useEffect(() => {
		// Fetch data from the server
		fetchGeoJson();

		// Initialize the map
		mapboxgl.accessToken = accessToken;

		if (!mapboxgl.supported()) {
			alert('Your browser does not support WebGL');
		} else {
			mapRef.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/streets-v12',
				center: [-123.114578, 49.285074], // Default location
				zoom: 14,
			});
		}

		// Get current location
		const getLocation = () => {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					mapRef.current.setCenter([longitude, latitude]);
				},
				(error) => {
					console.error('Error getting location:', error.message);
					alert('Geolocation is blocked or unavailable. Using default location.');
					// Fallback to a default location
					mapRef.current.setCenter([-123.114578, 49.285074]);
				}
			);
		};
		getLocation();

		const geolocate = new GeolocateControl({
			positionOptions: { enableHighAccuracy: true },
			trackUserLocation: true,
		});

		mapRef.current.addControl(geolocate);
	}, [accessToken]);

	useEffect(() => {
		if (geoJson) {
			// Add markers to the map when GeoJSON data is available
			const markers = getMarkersFromGeoJson(geoJson);
			markers.forEach((marker) => {
				marker.getElement().addEventListener('click', function () {
					setSelectedBusiness(marker.id);
					setSelectedCard(geoJson.features.filter((feature) => feature.properties.name === marker.id));
				});
				marker.addTo(mapRef.current);
			});
		}
	}, [geoJson]);

	return (
		<div className="container">
			<Header handleSearchInput={handleSearchInput} />
			<Aside selectedCard={selectedCard} selectedBusiness={selectedBusiness} geoJson={geoJson} search={search} businesses={businesses} />
			<Main mapContainer={mapContainer} />
		</div>
	);
}

export default Home;
