import './Card.scss';
import { useState } from 'react';
import {
	Card as MUICard,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	IconButton,
	Collapse,
	Typography,
	Avatar,
} from '@mui/material';
import { red, grey } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import Divider from '@mui/material/Divider';
import OpenTime from './OpenTime';
import DrinksMenu from './DrinksMenu';
import FoodMenu from './FoodMenu';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';

function Card({
	title,
	address,
	images,
	time,
	contact_number,
	drinks,
	food,
	website,
	rating,
	url,
}) {
	const [expandedDrinks, setExpandedDrinks] = useState(false); // for drinks expansion
	const [expandedFood, setExpandedFood] = useState(false); // for food expansion

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
			ratingIcons.push(
				<BsStarFill key={i} style={{ color: '#F2BE22', fontSize: '0.8rem' }} />
			);
		} else if (i === integerPart && decimalPart > 0) {
			ratingIcons.push(
				<BsStarHalf key={i} style={{ color: '#F2BE22', fontSize: '0.8rem' }} />
			);
		} else {
			break;
		}
	}

	return (
		<MUICard variant="outlined">
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
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={
					<Typography sx={{ fontFamily: 'Rubik', fontSize: '0.85rem' }}>
						{title}
					</Typography>
				}
				subheader={
					<Typography
						sx={{
							fontFamily: 'Rubik',
							fontSize: '0.75rem',
							fontWeight: '300',
						}}>
						{address}
					</Typography>
				}
			/>
			<CardMedia component="img" image={images} alt={title} sx={{ aspectRatio: '16/9' }} />
			<CardContent>
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{
						fontFamily: 'Rubik',
						fontSize: '0.75rem',
					}}>
					{time ? <OpenTime time={time} /> : 'No opening time available'}
				</Typography>
			</CardContent>
			<Divider />
			<CardActions
				disableSpacing
				sx={{
					justifyContent: 'space-between',
					padding: '0.3rem 1rem',
				}}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						fontSize: '0.8rem',
					}}>
					<Typography sx={{ fontWeight: '400' }} variant="subheading">
						Rating:
					</Typography>
					<div
						style={{
							marginLeft: '0.3rem',
							display: 'flex',
							alignItems: 'center',
							gap: '0.2rem',
							fontWeight: '200',
						}}>
						{rating}
						<>{ratingIcons}</>
					</div>
				</div>
				<div>
					<IconButton
						onClick={handleExpandDrinksClick}
						aria-expanded={expandedDrinks}
						aria-label="show drinks"
						sx={{ color: expandedDrinks ? red[400] : grey[600] }} // Active color for drinks
					>
						<SportsBarIcon />
					</IconButton>
					<IconButton
						onClick={handleExpandFoodClick}
						aria-expanded={expandedFood}
						aria-label="show food"
						sx={{ color: expandedFood ? red[400] : grey[600] }} // Active color for food
					>
						<RestaurantMenuOutlinedIcon />
					</IconButton>
				</div>
			</CardActions>
			{/* Drinks Section */}
			<Collapse in={expandedDrinks} timeout="auto" unmountOnExit>
				<Divider />
				<CardContent>
					<DrinksMenu drinks={drinks} website={website} />
				</CardContent>
			</Collapse>
			{/* Food Section */}
			<Collapse in={expandedFood} timeout="auto" unmountOnExit>
				<Divider />
				<CardContent>
					<FoodMenu food={food} website={website} />
				</CardContent>
			</Collapse>
		</MUICard>
	);
}

export default Card;
