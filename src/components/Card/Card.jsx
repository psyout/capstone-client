import './Card.scss';
import { useState } from 'react';
import { Card as MUICard, CardHeader, CardMedia, CardContent, CardActions, IconButton, Collapse, Typography, Avatar } from '@mui/material';
import { blueGrey, red, grey } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import OpenTime from './OpenTime';
import DrinksMenu from './DrinksMenu';
import FoodMenu from './FoodMenu';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';

function Card({ title, address, images, time, contact_number, drinks, food, website, rating, url }) {
	const [isLiked, setIsLiked] = useState(false);
	const [expandedDrinks, setExpandedDrinks] = useState(false); // for drinks expansion
	const [expandedFood, setExpandedFood] = useState(false); // for food expansion

	const shareOnFacebook = () => {
		const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
		window.open(facebookUrl, '_blank');
	};

	const handleLikeClick = () => {
		setIsLiked(!isLiked);
	};

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

	const maxRating = 5;
	const ratingIcons = [];
	const integerPart = Math.floor(rating);
	const decimalPart = rating - integerPart;

	for (let i = 0; i < maxRating; i++) {
		if (i < integerPart) {
			ratingIcons.push(<BsStarFill key={i} style={{ color: '#F2BE22', fontSize: '0.8rem' }} />);
		} else if (i === integerPart && decimalPart > 0) {
			ratingIcons.push(<BsStarHalf key={i} style={{ color: '#F2BE22', fontSize: '0.8rem' }} />);
		} else {
			break;
		}
	}

	return (
		<MUICard>
			<CardHeader
				avatar={<Avatar sx={{ bgcolor: blueGrey[800], fontWeight: '700', fontFamily: 'Rubik' }}>{title.charAt(0)}</Avatar>}
				action={
					<IconButton aria-label='settings'>
						<MoreVertIcon />
					</IconButton>
				}
				title={<Typography sx={{ fontFamily: 'Rubik', fontSize: '0.85rem' }}>{title}</Typography>}
				subheader={<Typography sx={{ fontFamily: 'Rubik', fontSize: '0.75rem', fontWeight: '300' }}>{address}</Typography>}
			/>
			<CardMedia component='img' image={images} alt={title} sx={{ aspectRatio: '16/9' }} />
			<CardContent>
				<Typography variant='body2' color='text.secondary' sx={{ fontFamily: 'Rubik', fontSize: '0.75rem' }}>
					{time ? <OpenTime time={time} /> : 'No opening time available'}
				</Typography>
				{/* <div style={{ display: 'flex' }}>
					<Typography variant='h6'>Rating:</Typography>
					{rating}
					{ratingIcons}
				</div> */}
			</CardContent>
			<CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
				<div>
					<IconButton aria-label='add to favorites' onClick={handleLikeClick}>
						<FavoriteIcon color={isLiked ? 'error' : 'inherit'} />
					</IconButton>
					<IconButton aria-label='share' onClick={shareOnFacebook}>
						<ShareIcon />
					</IconButton>
				</div>
				<div>
					<IconButton
						onClick={handleExpandDrinksClick}
						aria-expanded={expandedDrinks}
						aria-label='show drinks'
						sx={{ color: expandedDrinks ? red[400] : grey[600] }} // Active color for drinks
					>
						<SportsBarIcon />
					</IconButton>
					<IconButton
						onClick={handleExpandFoodClick}
						aria-expanded={expandedFood}
						aria-label='show food'
						sx={{ color: expandedFood ? red[400] : grey[600] }} // Active color for food
					>
						<RestaurantMenuOutlinedIcon />
					</IconButton>
				</div>
			</CardActions>
			{/* Drinks Section */}
			<Collapse in={expandedDrinks} timeout='auto' unmountOnExit>
				<CardContent>
					<DrinksMenu drinks={drinks} website={website} />
				</CardContent>
			</Collapse>
			{/* Food Section */}
			<Collapse in={expandedFood} timeout='auto' unmountOnExit>
				<CardContent>
					<FoodMenu food={food} website={website} />
				</CardContent>
			</Collapse>
		</MUICard>
	);
}

export default Card;
