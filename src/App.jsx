import './App.scss';
import Home from './assets/pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddLocation from './assets/pages/AddLocation';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/add-location" element={<AddLocation />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
