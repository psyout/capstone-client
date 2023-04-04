import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { ZoomControl } from 'mapbox-gl-controls';
import { GeolocateControl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl-controls/lib/controls.css';
import './Map.scss';
// import geoJson from '../../data/places.json';

export const apiUrl = 'http://localhost:3001';

function Map() {
   const mapContainer = useRef([]);
   const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
   const [restaurants, setRestaurants] = useState([]);

   const mapRef = useRef({});

   useEffect(() => {
      mapboxgl.accessToken = accessToken;

      // set map style and original location
      mapRef.current = new mapboxgl.Map({
         container: mapContainer.current,
         style: 'mapbox://styles/mapbox/light-v10',
         center: [-123.151, 49.269],
         zoom: 14,
      });

      // get current location
      const geolocate = new GeolocateControl({
         positionOptions: { enableHighAccuracy: true },
         trackUserLocation: true,
      });

      mapRef.current.addControl(geolocate);
      geolocate.on('geolocate', function (event) {
         console.log(event.coords.latitude, event.coords.longitude);
      });

      // zoom control
      mapRef.current.addControl(new ZoomControl(), 'bottom-right');

      // fetch restaurants data from the server\
      let endpoints = [
         `${apiUrl}/api/restaurants`,
         `${apiUrl}/api/bars`,
         `${apiUrl}/api/canadian`,
         `${apiUrl}/api/seafood`,
         `${apiUrl}/api/karaoke`,
         `${apiUrl}/api/delis`,
         `${apiUrl}/api/cideries`,
         `${apiUrl}/api/mexican`,
      ];

      axios
         .all(endpoints.map((endpoint) => axios.get(endpoint)))
         .then(
            axios.spread((...responses) => {
               const businesses = responses.map((response) => response.data.businesses).flat();
               setRestaurants(businesses);
               businesses.forEach((business) => {
                  const popup = new mapboxgl.Popup().setHTML(`
                  <div>
                    ${business.name}
                    ${business.location.address1}
                    ${business.location.city}, ${business.location.state} ${business.location.zip_code}
                    Rating: ${business.rating} | Reviews: ${business.review_count}
                  </div>`);

                  const marker = new mapboxgl.Marker()
                     .setLngLat([business.coordinates.longitude, business.coordinates.latitude])
                     .setPopup(popup)
                     .addTo(mapRef.current);

                  marker.getElement().addEventListener('click', function () {
                     console.log(business);
                     marker.togglePopup();
                  });
               });
            })
         )
         .catch((error) => {
            console.log(error);
         });
   }, [accessToken]);

   return (
      <div className='map' ref={mapContainer}>
         {/* {restaurants.map((restaurant) => (
            <div key={restaurant.id}>{restaurant.name}</div>
         ))} */}
      </div>
   );
}

export default Map;
