import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { ZoomControl } from 'mapbox-gl-controls';
import { GeolocateControl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl-controls/lib/controls.css';
import axios from 'axios';
import './Map.scss';

function Map() {
     const mapContainer = useRef([]);
     const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

     const mapRef = useRef({});

     useEffect(() => {
          mapboxgl.accessToken = accessToken;

          // set map style and original location
          mapRef.current = new mapboxgl.Map({
               container: mapContainer.current,
               style: 'mapbox://styles/mapbox/light-v10',
               center: [-123.1607, 49.269],
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

          axios.get('../data/data.geojson')
               .then((response) => response.data)
               .then((data) => {
                    mapRef.current.addSource('markers', {
                         type: 'geojson',
                         data: data,
                    });
               })
               .catch((error) => {
                    console.log(error);
               });
     });

     return <div className='map' ref={mapContainer}></div>;
}

export default Map;
