import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Aside from '../../components/Aside/Aside';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { ZoomControl } from 'mapbox-gl-controls';
import { GeolocateControl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl-controls/lib/controls.css';
import geoJson from '../../data/places.json';

export const apiUrl = 'http://localhost:3006';

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
			const color = '#8a8ba6';
			const popup = new mapboxgl.Popup().setHTML(`
			<div>
			  <p>${name}</p>
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
		mapRef.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/light-v10',
			// change this coordinates to center map according with current location
			center: [-123.151, 49.269],
			zoom: 15,
		});

		// get my current location
		const getLocation = () => {
			navigator.geolocation.getCurrentPosition((response) => {
				console.log(response);
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

		// zoom control
		mapRef.current.addControl(new ZoomControl(), 'bottom-right');

		// Add markers from geojson file
		const markers = getMarkersFromGeoJson(geoJson);

		markers.forEach((marker) => {
			marker.getElement().addEventListener('click', function () {
				console.log('marker', marker.id);
				// set the selected marker as part of the array
				setSelectedBusiness(marker.id);
				setSelectedCard(geoJson.features.filter((feature) => feature.properties.name === marker.id));
			});
			marker.addTo(mapRef.current);
		});

		// 		Promise.all(requests)
		//   .then((responses) => {
		//     const businesses = responses.map((response) => response.data.businesses).flat();
		//     setBusinesses(businesses);
		//     console.log('businesses: ', businesses);
		//   })
		//   .catch((error) => {
		//     console.log(error);
		//   });
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
			// `${apiUrl}/api/lounges`,
			`${apiUrl}/api/spanish`,
			`${apiUrl}/api/australian`,
			`${apiUrl}/api/pubs`,
			`${apiUrl}/api/dive-bars`,
			// `${apiUrl}/api/gastropubs`,
			// `${apiUrl}/api/persian`,
			// `${apiUrl}/api/breakfast-brunch`,
			`${apiUrl}/api/burgers`,
		];

		axios
			.all(endpoints.map((endpoint) => axios.get(endpoint)))
			.then(
				axios.spread((...responses) => {
					const businesses = responses.map((response) => response.data.businesses).flat();
					setBusinesses(businesses);
					console.log('businessess: ', businesses);
				})
			)
			.catch((error) => {
				console.log(error);
			});
	}, [accessToken, setSelectedBusiness]);

	return (
		<div className='container'>
			<Header handleSearchInput={handleSearchInput} />
			<Aside selectedCard={selectedCard} selectedBusiness={selectedBusiness} geoJson={geoJson} search={search} businesses={businesses} />
			<Main mapContainer={mapContainer} />
		</div>
	);
}

export default Home;
