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

export const apiUrl = 'http://localhost:3009';

function Home() {
   // eslint-disable-next-line
   const [map, setMap] = useState([]);
   const [selectedBusiness, setSelectedBusiness] = useState(null);

   const mapContainer = useRef(null);
   const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

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

      // fetch restaurants data from the server
      let endpoints = [
         `${apiUrl}/api/seafood`,
         //  `${apiUrl}/api/restaurants`,
         //  `${apiUrl}/api/bars`,
         //  `${apiUrl}/api/canadian`,
         //  `${apiUrl}/api/karaoke`,
         //  `${apiUrl}/api/delis`,
         //  `${apiUrl}/api/cideries`,
         //  `${apiUrl}/api/mexican`,
      ];

      axios
         .all(endpoints.map((endpoint) => axios.get(endpoint)))
         .then(
            axios.spread((...responses) => {
               const businesses = responses.map((response) => response.data.businesses).flat();

               businesses.forEach((business) => {
                  const popup = new mapboxgl.Popup().setHTML(`
                  <div>
                    ${business.name}
                    ${business.location.address1}
                    ${business.location.city}, ${business.location.state} ${business.location.zip_code}
                    Rating: ${business.rating} | Reviews: ${business.review_count}
                  </div>`);

                  // Adding markers
                  const marker = new mapboxgl.Marker()
                     .setLngLat([business.coordinates.longitude, business.coordinates.latitude])
                     //  .setPopup(popup)
                     .addTo(mapRef.current);

                  marker.getElement().addEventListener('click', function () {
                     //function to slice characters
                     const limitedName = business.name.slice(0, 20);
                     console.log(business);
                     setSelectedBusiness({ ...business, name: limitedName });
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
      <div className='container'>
         <Header />
         <Aside selectedBusiness={selectedBusiness} />
         <Main map={map} mapContainer={mapContainer} />
      </div>
   );
}

export default Home;
