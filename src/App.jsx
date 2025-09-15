import './App.scss';
import Home from './assets/pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddLocation from './assets/pages/AddLocation';
import CoverLetter from './assets/pages/CoverLetter';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/add-location'
						element={<AddLocation />}
					/>
					<Route
						path='/cover-letter'
						element={<CoverLetter />}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
