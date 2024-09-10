// import React, { useState } from 'react';
import { FaSearch, FaCocktail } from 'react-icons/fa';

// import { FaUserAlt } from 'react-icons/fa';
// import logo from '../../assets/images/logo.svg';
import './Header.scss';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
// import LoginForm from '../LoginForm/LoginForm';

// const styleBg = {
// 	bgcolor: 'rgba(43, 40, 64, 0.2)',
// };

// const styleBox = {
// 	width: '500px',
// 	height: '450px',
// 	display: 'flex',
// 	alignItems: 'center',
// };

function Header({ handleSearchInput }) {
	// const [open, setOpen] = useState(false);
	// const theme = useTheme();
	// const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };
	//
	// 	const handleClose = () => {
	// 		setOpen(false);
	// 	};

	return (
		<header className="header-container">
			<div className="header-container__logo">
				{/* <img src={logo} alt='Logo' className='header-container__logo--img' /> */}
				<h1 className="header-container__logo--title">
					VanSippy
					<FaCocktail style={{ paddingTop: '0.4rem' }} />
					<span> | Happy Hour Finder</span>
				</h1>
			</div>
			<div className="header-container__row">
				<div className="header-container__search">
					<input
						type="text"
						placeholder="Look for your next deal..."
						className="header-container__search-input"
						onChange={handleSearchInput}
					/>
					<button className="header-container__search-button">
						<FaSearch style={{ color: '#676f9d' }} />
					</button>
				</div>
				{/* <div onClick={handleClickOpen} className='header-container__avatar'>
					<FaUserAlt style={{ color: '#278C8C' }} />
				</div> */}
			</div>
		</header>
	);
}

export default Header;
