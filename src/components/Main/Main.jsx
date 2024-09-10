import './Main.scss';

function Main({ mapContainer }) {
	return (
		<div className="main">
			<div
				className="map"
				ref={mapContainer}
				style={{ width: '100%', height: '100vh' }}></div>
		</div>
	);
}

export default Main;
