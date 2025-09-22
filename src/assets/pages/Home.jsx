import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Aside from '../../components/Aside/Aside';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import PlaceHolder from '../../assets/images/placeholder.jpg';

function Home() {
	const [selectedBusiness, setSelectedBusiness] = useState(null);
	const [businesses, setBusinesses] = useState([]);
	const [geoJson, setGeoJson] = useState(null);
	const [search, setSearch] = useState('');
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

	// Add cleanup at the end of the effect that creates the map
	useEffect(() => {
		const controller = new AbortController();
		fetchGeoJson(controller.signal);
		mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

		if (!mapboxgl.supported()) {
			alert('Your browser does not support WebGL');
			return () => controller.abort();
		}

		let isMounted = true;

		const getInitialCenter = () =>
			new Promise((resolve) => {
				navigator.geolocation.getCurrentPosition(
					({ coords: { latitude, longitude } }) => resolve([longitude, latitude]),
					() => resolve([-123.114578, 49.285074]), // fallback if denied/unavailable
					{ enableHighAccuracy: true, timeout: 3000, maximumAge: 60000 }
				);
			});

		(async () => {
			const center = await getInitialCenter();
			if (!isMounted) return;

			mapRef.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/streets-v12',
				center,
				zoom: 15,
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
			});
		})();

		return () => {
			isMounted = false;
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

	return (
		<div className='container'>
			<Header handleSearchInput={(e) => setSearch(e.target.value)} />
			<Aside
				selectedBusiness={selectedBusiness}
				setSelectedBusiness={setSelectedBusiness}
				geoJson={geoJson}
				search={search}
				businesses={businesses}
			/>
			<Main mapContainer={mapContainer} />
		</div>
	);
}

export default Home;
