import './Card.scss';
import { useState, useEffect, useMemo } from 'react';
import { Card as MUICard, CardHeader, CardMedia, CardContent, CardActions, IconButton, Collapse, Typography, Avatar, Skeleton, Divider } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { red, grey } from '@mui/material/colors';
import LunchDiningTwoToneIcon from '@mui/icons-material/LunchDiningTwoTone';
import SportsBarTwoToneIcon from '@mui/icons-material/SportsBarTwoTone';
import PhoneInTalkTwoToneIcon from '@mui/icons-material/PhoneInTalkTwoTone';
import OpenTime from './OpenTime';
import DrinksMenu from './DrinksMenu';
import FoodMenu from './FoodMenu';
import PlaceHolder from '../../assets/images/placeholder.jpg';

function Card({ title, address, time, contact_number, drinks, food, website, image }) {
	const [expanded, setExpanded] = useState({ drinks: false, food: false });
	const [isLoading, setIsLoading] = useState(true);
	const [cardImage, setCardImage] = useState(image || PlaceHolder);

	useEffect(() => {
		setCardImage(image || PlaceHolder);
	}, [image]);

	// Simulate loading state
	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 3000);
		return () => clearTimeout(timer);
	}, []);

	// Toggle expand state
	const toggleExpand = (type) => {
		setExpanded((prev) => ({
			drinks: type === 'drinks' ? !prev.drinks : false,
			food: type === 'food' ? !prev.food : false,
		}));
	};

	// Helper function for dynamic icon color
	const getIconColor = (isExpanded) => (isExpanded ? red[400] : grey[600]);

	// Memoized avatar
	const avatar = useMemo(
		() => (
			<Avatar
				sx={{
					bgcolor: red[400],
					fontWeight: '700',
					fontSize: '1.2rem',
					fontFamily: 'Rubik',
					width: '35px',
					height: '35px',
				}}>
				{title.charAt(0)}
			</Avatar>
		),
		[title]
	);

	// Open Google Maps
	const openMaps = () => {
		if (address) {
			const encodedAddress = encodeURIComponent(address);
			window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
		} else {
			console.error('Address is not available');
		}
	};

	const stylesMap = {
		fontFamily: 'Rubik',
		fontSize: '0.75rem',
		fontWeight: '300',
		cursor: 'pointer',
		transition: 'color 0.3s ease',
		'&:hover': { color: '#ef5350' },
	};

	const stylesMenuText = {
		fontFamily: 'Rubik',
		fontSize: '0.8rem',
		fontWeight: '500',
		color: grey[600],
	};

	const iconSize = {
		fontSize: '1.8rem',
	};

	return (
		<MUICard variant='outlined'>
			{/* Header */}
			{isLoading ? (
				<Skeleton
					animation='wave'
					variant='rectangular'
					width='100%'
					height={60}
					sx={{ marginBottom: '1rem' }}
				/>
			) : (
				<CardHeader
					avatar={avatar}
					title={<Typography sx={{ fontFamily: 'Rubik', fontSize: '0.85rem', fontWeight: '400' }}>{title}</Typography>}
					subheader={
						<Typography
							onClick={openMaps}
							sx={{ ...stylesMap }}>
							{address}
						</Typography>
					}
				/>
			)}

			{/* Media */}
			{isLoading ? (
				<Skeleton
					animation='wave'
					variant='rectangular'
					width='100%'
					height={150}
				/>
			) : (
				<CardMedia
					component='img'
					image={cardImage}
					alt={title}
					sx={{ aspectRatio: '16/9', maxHeight: '150px' }}
				/>
			)}

			{/* Content */}
			<CardContent>
				{isLoading ? (
					<Skeleton
						animation='wave'
						variant='text'
					/>
				) : (
					<Typography
						variant='body2'
						color='text.secondary'
						sx={{ fontFamily: 'Rubik', fontSize: '0.75rem' }}>
						{time ? <OpenTime time={time} /> : 'No opening time available'}
					</Typography>
				)}
			</CardContent>

			<Divider />

			{/* Actions */}
			<CardActions
				disableSpacing
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					padding: '0.5rem 1rem',
				}}>
				{/* Call Button */}
				{isLoading ? (
					<Skeleton
						animation='wave'
						variant='circular'
						width={24}
						height={24}
					/>
				) : (
					<IconButton
						onClick={() => {
							if (contact_number) {
								window.location.href = `tel:${contact_number}`;
							} else {
								console.error('Contact number is not available');
							}
						}}
						sx={{ color: grey[600] }}
						aria-label='call business'>
						<PhoneInTalkTwoToneIcon style={iconSize} />
					</IconButton>
				)}

				{/* Menu Buttons */}
				{isLoading ? (
					<div style={{ display: 'flex', gap: '0.5rem' }}>
						<Skeleton
							animation='wave'
							variant='circular'
							width={24}
							height={24}
						/>
						<Skeleton
							animation='wave'
							variant='circular'
							width={24}
							height={24}
						/>
					</div>
				) : (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Typography
							variant='body2'
							sx={{ ...stylesMenuText }}>
							Menu
						</Typography>
						<NavigateNextIcon sx={{ color: grey[600], fontSize: 'rem' }} />
						<IconButton
							onClick={() => toggleExpand('drinks')}
							aria-expanded={expanded.drinks}
							aria-label='show drinks'
							sx={{ color: getIconColor(expanded.drinks) }}>
							<SportsBarTwoToneIcon style={iconSize} />
						</IconButton>
						<IconButton
							onClick={() => toggleExpand('food')}
							aria-expanded={expanded.food}
							aria-label='show food'
							sx={{ color: getIconColor(expanded.food) }}>
							<LunchDiningTwoToneIcon style={iconSize} />
						</IconButton>
					</div>
				)}
			</CardActions>

			{/* Collapsible Menus */}
			<Collapse
				in={expanded.drinks}
				timeout='auto'
				unmountOnExit>
				<Divider />
				<CardContent>
					<DrinksMenu
						drinks={drinks}
						website={website}
					/>
				</CardContent>
			</Collapse>
			<Collapse
				in={expanded.food}
				timeout='auto'
				unmountOnExit>
				<Divider />
				<CardContent>
					<FoodMenu
						food={food}
						website={website}
					/>
				</CardContent>
			</Collapse>
		</MUICard>
	);
}

export default Card;
