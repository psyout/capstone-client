import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Aside from '../../components/Aside/Aside';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { GeolocateControl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl-controls/lib/controls.css';
import geoJson from '../../data/places.json';

export const apiUrl = 'https://wulen-server.onrender.com' || 'http://localhost:3008';

function Home() {
	const [selectedBusiness, setSelectedBusiness] = useState(null);
	const [selectedCard, setSelectedCard] = useState([]);
	const [businesses, setBusinesses] = useState([]);

	// search
	const [search, setSearch] = useState('');
	const handleSearchInput = (event) => {
		const { value } = event.target;
		setSearch(value);
	};

	const mapContainer = useRef(null);
	const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

	const mapRef = useRef({});

	// get markers from the json
	const getMarkersFromGeoJson = (geojson) => {
		const markers = geojson.features.map((feature) => {
			const { coordinates } = feature.geometry;
			const { name } = feature.properties;
			const { address } = feature.properties;
			const color = '#8a8ba6';
			const popup = new mapboxgl.Popup().setHTML(`
			<div>
			  <p>${name}</p>
			  <p>${address}</p>
			</div>
		  `);
			const marker = new mapboxgl.Marker({ color }).setLngLat(coordinates).setPopup(popup);
			marker.id = name;
			return marker;
		});
		return markers;
	};

	useEffect(() => {
		// init map
		mapboxgl.accessToken = accessToken;

		// set map style and original location
		if (!mapboxgl.supported()) {
			alert('Your browser does not support WebGL');
		} else {
			mapboxgl.accessToken = accessToken;
			mapRef.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/streets-v12',
				center: [-123.114578, 49.285074],
				zoom: 14,
			});
		}

		// get my current location
		const getLocation = () => {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;
				mapRef.current.setCenter([longitude, latitude]);
			});
		};
		getLocation();

		// get current location
		const geolocate = new GeolocateControl({
			positionOptions: { enableHighAccuracy: true },
			trackUserLocation: true,
		});

		// location map control
		mapRef.current.addControl(geolocate);
		geolocate.on('geolocate', function (event) {
			console.log(event.coords.latitude, event.coords.longitude);
		});

		// Markers on the map
		const markers = getMarkersFromGeoJson(geoJson);

		markers.forEach((marker) => {
			marker.getElement().addEventListener('click', function () {
				setSelectedBusiness(marker.id);
				setSelectedCard(
					geoJson.features.filter((feature) => feature.properties.name === marker.id)
				);
			});
			marker.addTo(mapRef.current);
		});

		// fetch restaurants data from the server
		let endpoints = [
			`${apiUrl}/api/seafood`,
			`${apiUrl}/api/restaurants`,
			`${apiUrl}/api/bars`,
			`${apiUrl}/api/canadian`,
			`${apiUrl}/api/karaoke`,
			`${apiUrl}/api/delis`,
			`${apiUrl}/api/cideries`,
			`${apiUrl}/api/mexican`,
			`${apiUrl}/api/lounges`,
			`${apiUrl}/api/spanish`,
			`${apiUrl}/api/australian`,
			`${apiUrl}/api/pubs`,
			`${apiUrl}/api/dive-bars`,
			`${apiUrl}/api/gastropubs`,
			`${apiUrl}/api/persian`,
			`${apiUrl}/api/breakfast-brunch`,
			`${apiUrl}/api/burgers`,
		];

		endpoints.forEach((endpoint, i) => {
			setTimeout(() => {
				axios.get(endpoint).then((response) => {
					setBusinesses((prevBusinesses) => {
						// Ensure reviews are part of each business object
						return [...prevBusinesses, response.data.businesses].flat();
					});
				});
			}, 200 * i);
		});
	}, [accessToken, setSelectedBusiness]);

	return (
		<div className="container">
			<Header handleSearchInput={handleSearchInput} />
			<Aside
				selectedCard={selectedCard}
				selectedBusiness={selectedBusiness}
				geoJson={geoJson}
				search={search}
				businesses={businesses}
			/>
			<Main mapContainer={mapContainer} />
		</div>
	);
}

export default Home;
