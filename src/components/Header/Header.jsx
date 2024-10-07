import { FaCocktail } from 'react-icons/fa';
import SearchIcon from '@mui/icons-material/Search';
import './Header.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

function Header({ handleSearchInput }) {
	return (
		<header className="header-container">
			<div className="header-container__logo">
				<h1 className="header-container__logo--title">
					VanSippy
					<FaCocktail style={{ paddingTop: '0.4rem' }} />
					<span> | Happy Hour Finder</span>
				</h1>
			</div>
			<div className="header-container__row">
				<Box
					noValidate
					autoComplete="off"
					component={'form'}
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
						label="Search for neighborhood or place"
						variant="outlined"
						color="primary"
						onChange={handleSearchInput}
						fullWidth
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<SearchIcon
										style={{
											color: '#2b2840',
											fontSize: '1.4rem',
										}}
									/>
								</InputAdornment>
							),
							style: {
								fontSize: '0.85rem', // font size
								color: '#2b2840', // text color
								fontFamily: 'Rubik, sans-serif',
							},
						}}
						InputLabelProps={{
							style: {
								fontSize: '0.85rem', // label font size
								color: '#2b2840', // label color
								fontFamily: 'Rubik, sans-serif',
							},
						}}
					/>
				</Box>
			</div>
		</header>
	);
}

export default Header;
