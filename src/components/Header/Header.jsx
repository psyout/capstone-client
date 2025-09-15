import { FaCocktail } from 'react-icons/fa';
import SearchIcon from '@mui/icons-material/Search';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import './Header.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

function Header({ handleSearchInput }) {
	const inputStyles = {
		fontSize: '0.85rem',
		color: '#2b2840',
		fontFamily: 'Rubik, sans-serif',
	};

	return (
		<header className='header-container'>
			<div className='header-container__logo'>
				<h1 className='header-container__logo--title'>
					VanSippy
					<FaCocktail style={{ paddingTop: '0.4rem' }} />
					<span> | Happy Hour Finder</span>
				</h1>
			</div>
			<div className='header-container__row'>
				<Box
					noValidate
					autoComplete='off'
					component='form'
					sx={{
						display: 'flex',
						alignItems: 'center',
						width: '100%',
					}}>
					<TextField
						sx={{
							'& .MuiOutlinedInput-root': {
								padding: '1.5rem 0.75rem 1.5rem',
								maxHeight: '1rem',
							},
						}}
						label='Search for neighborhood or place'
						variant='outlined'
						color='primary'
						onChange={handleSearchInput}
						fullWidth
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<SearchIcon
										style={{
											color: inputStyles.color,
											fontSize: '1.4rem',
										}}
									/>
								</InputAdornment>
							),
							style: inputStyles,
						}}
						InputLabelProps={{
							style: inputStyles,
						}}
					/>
				</Box>
				<ProfileIcon
					style={{
						color: '#2b2840',
						fontSize: '2.6rem',
						cursor: 'pointer',
						marginLeft: '1rem',
					}}
					titleAccess='User Profile'></ProfileIcon>
			</div>
		</header>
	);
}

export default Header;
