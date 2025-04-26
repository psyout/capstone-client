import './Card.scss';
import { useState, useEffect } from 'react';
import { Card as MUICard, CardHeader, CardMedia, CardContent, CardActions, IconButton, Collapse, Typography, Avatar, Skeleton } from '@mui/material';
import { red, grey } from '@mui/material/colors';
import LunchDiningTwoToneIcon from '@mui/icons-material/LunchDiningTwoTone';
import SportsBarTwoToneIcon from '@mui/icons-material/SportsBarTwoTone';
import PhoneInTalkTwoToneIcon from '@mui/icons-material/PhoneInTalkTwoTone';
import Divider from '@mui/material/Divider';
import OpenTime from './OpenTime';
import DrinksMenu from './DrinksMenu';
import FoodMenu from './FoodMenu';
import PlaceHolder from '../../assets/images/placeholder.jpg';

function Card({ title, address, images, time, contact_number, drinks, food, website, image }) {
	const [expandedDrinks, setExpandedDrinks] = useState(false);
	const [expandedFood, setExpandedFood] = useState(false);
	const [isLoading, setIsLoading] = useState(true); // Loading state

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3000); // loading delay

		return () => clearTimeout(timer);
	}, []);

	const handleExpandDrinksClick = () => {
		setExpandedDrinks(!expandedDrinks);
		if (expandedFood) {
			setExpandedFood(false);
		}
	};

	const handleExpandFoodClick = () => {
		setExpandedFood(!expandedFood);
		if (expandedDrinks) {
			setExpandedDrinks(false); // Close drinks if food is opened
		}
	};

	// const maxRating = 5;
	// const ratingIcons = [];
	// const integerPart = Math.floor(rating);
	// const decimalPart = rating - integerPart;

	// for (let i = 0; i < maxRating; i++) {
	// 	if (i < integerPart) {
	// 		ratingIcons.push(
	// 			<BsStarFill key={i} style={{ color: '#F2BE22', fontSize: '0.7rem' }} />
	// 		);
	// 	} else if (i === integerPart && decimalPart > 0) {
	// 		ratingIcons.push(
	// 			<BsStarHalf key={i} style={{ color: '#F2BE22', fontSize: '0.7rem' }} />
	// 		);
	// 	} else {
	// 		break;
	// 	}
	// }

	const openMaps = () => {
		if (address) {
			const encodedAddress = encodeURIComponent(address); // Encode the address for URL
			const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
			window.open(mapUrl, '_blank');
		} else {
			console.error('Address is not available');
		}
	};

	return (
		<MUICard variant="outlined">
			{isLoading ? (
				<div style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
					<Skeleton animation="wave" variant="circular" width={35} height={35} sx={{ marginRight: '1rem' }} />
					<Skeleton animation="wave" variant="text" width="60%" height={28} />
				</div>
			) : (
				<CardHeader
					avatar={
						<Avatar
							sx={{
								bgcolor: red[400],
								fontWeight: '700',
								fontSize: '1rem',
								fontFamily: 'Rubik',
								width: '35px',
								height: '35px',
							}}>
							{title.charAt(0)}
						</Avatar>
					}
					title={<Typography sx={{ fontFamily: 'Rubik', fontSize: '0.85rem', fontWeight: '400' }}>{title}</Typography>}
					subheader={
						<Typography
							onClick={openMaps}
							sx={{
								fontFamily: 'Rubik',
								fontSize: '0.75rem',
								fontWeight: '300',
								cursor: 'pointer',
								transition: 'color 0.3s ease',
								'&:hover': {
									color: '#ef5350',
								},
								'@media (max-width: 768px)': {
									'&:hover': {
										color: 'inherit',
									},
								},
								'@media (hover: none)': {
									'&:hover': {
										color: 'inherit',
									},
								},
							}}>
							{address}
						</Typography>
					}
				/>
			)}

			{isLoading ? (
				<Skeleton animation="wave" variant="rectangular" width="100%" height={150} />
			) : (
				<CardMedia
					component="img"
					image={image || PlaceHolder} // Use the relative URL or a placeholder
					alt={title}
					sx={{ aspectRatio: '16/9', maxHeight: '150px' }}
				/>
			)}

			<CardContent>
				{isLoading ? (
					<Skeleton animation="wave" variant="text" />
				) : (
					<Typography
						variant="body2"
						color="text.secondary"
						component="div" // Ensures Typography renders a <div> instead of <p>
						sx={{
							fontFamily: 'Rubik',
							fontSize: '0.75rem',
						}}>
						{time ? <OpenTime time={time} /> : 'No opening time available'}
					</Typography>
				)}
			</CardContent>

			<Divider />

			<CardActions
				disableSpacing
				sx={{
					justifyContent: 'space-between',
					padding: '0.3rem 1rem',
				}}>
				<div>
					{isLoading ? (
						<Skeleton animation="wave" variant="circular" width={24} height={24} />
					) : (
						<>
							<IconButton
								onClick={() => {
									window.location.href = `tel:${contact_number}`;
								}}
								sx={{ color: grey[600] }}
								aria-label="call business">
								<PhoneInTalkTwoToneIcon />
							</IconButton>

							<IconButton onClick={handleExpandDrinksClick} aria-expanded={expandedDrinks} aria-label="show drinks" sx={{ color: expandedDrinks ? red[400] : grey[600] }}>
								<SportsBarTwoToneIcon />
							</IconButton>
							<IconButton onClick={handleExpandFoodClick} aria-expanded={expandedFood} aria-label="show food" sx={{ color: expandedFood ? red[400] : grey[600] }}>
								<LunchDiningTwoToneIcon />
							</IconButton>
						</>
					)}
				</div>
			</CardActions>

			{!isLoading && (
				<Collapse in={expandedDrinks} timeout="auto" unmountOnExit>
					<Divider />
					<CardContent>
						<DrinksMenu drinks={drinks} website={website} />
					</CardContent>
				</Collapse>
			)}

			{!isLoading && (
				<Collapse in={expandedFood} timeout="auto" unmountOnExit>
					<Divider />
					<CardContent>
						<FoodMenu food={food} website={website} />
					</CardContent>
				</Collapse>
			)}
		</MUICard>
	);
}

export default Card;
