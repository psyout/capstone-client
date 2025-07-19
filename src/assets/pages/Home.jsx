import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Aside from '../../components/Aside/Aside';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { GeolocateControl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl-controls/lib/controls.css';
import PlaceHolder from '../../assets/images/placeholder.jpg';

function Home() {
	const [selectedBusiness, setSelectedBusiness] = useState(null);
	const [selectedCard, setSelectedCard] = useState([]);
	const [businesses, setBusinesses] = useState([]);
	const [geoJson, setGeoJson] = useState(null);
	const [allImagesLoaded, setAllImagesLoaded] = useState(false);

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
			const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/locations`);
			const result = await response.json();
			const locations = result.data;

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
			setAllImagesLoaded(false); // Reset image loading state on new fetch
		} catch (error) {
			console.error('Error fetching GeoJSON data:', error);
		}
	};

	// Get markers from the GeoJSON data
	const getMarkersFromGeoJson = (geojson) => {
		const markers = geojson.features.map((feature) => {
			const { coordinates } = feature.geometry;
			const { name, address } = feature.properties;
			const color = '#8a8ba6';

			const popup = new mapboxgl.Popup().setHTML(`
                <div>
                    <h3>${name}</h3>
                    <p><strong>Address:</strong> ${address}</p>
                </div>
            `);

			const marker = new mapboxgl.Marker({ color }).setLngLat(coordinates).setPopup(popup);
			marker.id = name;
			return marker;
		});
		return markers;
	};

	useEffect(() => {
		fetchGeoJson();

		mapboxgl.accessToken = accessToken;

		if (!mapboxgl.supported()) {
			alert('Your browser does not support WebGL');
		} else {
			mapRef.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/streets-v12',
				center: [-123.114578, 49.285074],
				zoom: 14,
			});
		}

		const geolocate = new GeolocateControl({
			positionOptions: { enableHighAccuracy: true },
			trackUserLocation: true,
			showUserLocation: true,
		});

		mapRef.current.addControl(geolocate);

		geolocate.on('geolocate', (e) => {
			const { latitude, longitude } = e.coords;
			mapRef.current.setCenter([longitude, latitude]);
			mapRef.current.setZoom(13);
		});
	}, [accessToken]);

	useEffect(() => {
		if (geoJson) {
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

	// Handler for when all images are loaded in the card list
	const handleAllImagesLoaded = () => setAllImagesLoaded(true);

	return (
		<div className='container'>
			<Header handleSearchInput={handleSearchInput} />
			<Aside
				selectedCard={selectedCard}
				selectedBusiness={selectedBusiness}
				geoJson={geoJson}
				search={search}
				businesses={businesses}
				allImagesLoaded={allImagesLoaded}
				onAllImagesLoaded={handleAllImagesLoaded}
			/>
			<Main mapContainer={mapContainer} />
		</div>
	);
}

export default Home;
