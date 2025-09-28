import './Card.scss';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card as MUICard, CardHeader, CardMedia, CardContent, CardActions, IconButton, Collapse, Typography, Avatar, Skeleton, Divider, Chip } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { red, grey } from '@mui/material/colors';
import LunchDiningTwoToneIcon from '@mui/icons-material/LunchDiningTwoTone';
import SportsBarTwoToneIcon from '@mui/icons-material/SportsBarTwoTone';
import PhoneInTalkTwoToneIcon from '@mui/icons-material/PhoneInTalkTwoTone';
import OpenTime from './OpenTime';
import DrinksMenu from './DrinksMenu';
import FoodMenu from './FoodMenu';
import PlaceHolder from '../../assets/images/placeholder.jpg';

function Card({ title, address, time, contact_number, drinks, food, website, image, showSkeleton, onImageLoad }) {
	const [expanded, setExpanded] = useState({ drinks: false, food: false });
	const [cardImage, setCardImage] = useState(image || PlaceHolder);
	const [imgLoaded, setImgLoaded] = useState(false);

	// Function to check if happy hour is currently active
	const isHappyHourActive = () => {
		if (!time || typeof time !== 'object') return false;

		const now = new Date();
		const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes
		const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.

		// Parse hours object like {"Mon-Fri": "4:00 PM - 6:00 PM", "Sat": "2:00 PM - 8:00 PM"}
		for (const [dayRange, timeRange] of Object.entries(time)) {
			try {
				// Parse day range (e.g., "Mon-Fri" or "Mon")
				let isCurrentDay = false;

				if (dayRange.includes('-')) {
					// Range like "Mon-Fri"
					const [startDay, endDay] = dayRange.split('-');
					const startDayNum = getDayNumber(startDay.trim());
					const endDayNum = getDayNumber(endDay.trim());

					if (startDayNum <= endDayNum) {
						isCurrentDay = currentDay >= startDayNum && currentDay <= endDayNum;
					} else {
						// Crosses weekend (e.g., Fri-Mon)
						isCurrentDay = currentDay >= startDayNum || currentDay <= endDayNum;
					}
				} else {
					// Single day
					const dayNum = getDayNumber(dayRange);
					isCurrentDay = currentDay === dayNum;
				}

				if (!isCurrentDay) continue;

				// Parse time range (e.g., "4:00 PM - 6:00 PM")
				if (timeRange && timeRange.includes('-')) {
					const [startTime, endTime] = timeRange.split(' - ');
					const startMinutes = parseTimeToMinutes(startTime.trim());
					const endMinutes = parseTimeToMinutes(endTime.trim());

					if (startMinutes !== null && endMinutes !== null) {
						if (startMinutes <= endMinutes) {
							// Same day range
							return currentTime >= startMinutes && currentTime <= endMinutes;
						} else {
							// Crosses midnight
							return currentTime >= startMinutes || currentTime <= endMinutes;
						}
					}
				}
			} catch (error) {
				console.warn('Error parsing time:', dayRange, timeRange, error);
			}
		}

		return false;
	};

	// Helper function to convert day name to number
	const getDayNumber = (dayName) => {
		const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
		const day = dayName.toLowerCase().substring(0, 3);
		return days.indexOf(day);
	};

	// Helper function to parse time string to minutes
	const parseTimeToMinutes = (timeStr) => {
		try {
			const [time, period] = timeStr.split(' ');
			const [hours, minutes] = time.split(':').map(Number);
			let totalMinutes = hours * 60 + (minutes || 0);

			if (period && period.toLowerCase() === 'pm' && hours !== 12) {
				totalMinutes += 12 * 60;
			} else if (period && period.toLowerCase() === 'am' && hours === 12) {
				totalMinutes -= 12 * 60;
			}

			return totalMinutes;
		} catch (error) {
			return null;
		}
	};

	useEffect(() => {
		setCardImage(image || PlaceHolder);
		setImgLoaded(false);
	}, [image]);

	const handleImageLoad = () => {
		setImgLoaded(true);
		if (onImageLoad) onImageLoad();
	};

	// Toggle expand state
	const toggleExpand = (type) => {
		setExpanded((prev) => ({
			drinks: type === 'drinks' ? !prev.drinks : false,
			food: type === 'food' ? !prev.food : false,
		}));
	};

	// Helper function for dynamic icon color
	const getIconColor = useCallback((isExpanded) => (isExpanded ? red[400] : grey[600]), []);

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
		fontSize: '0.8rem',
		fontWeight: '300',
		cursor: 'pointer',
		transition: 'color 0.3s ease',
		'&:hover': { color: '#ef5350' },
	};

	const stylesMenuText = {
		fontFamily: 'Rubik',
		fontSize: '0.9rem',
		fontWeight: '500',
		color: grey[600],
	};

	const iconSize = {
		fontSize: '1.8rem',
	};

	return (
		<MUICard variant='outlined'>
			{/* Header */}
			{showSkeleton ? (
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
					title={<Typography sx={{ fontFamily: 'Rubik', fontSize: '0.9rem', fontWeight: '400' }}>{title}</Typography>}
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
			<div style={{ position: 'relative', width: '100%', height: 150 }}>
				<CardMedia
					component='img'
					image={cardImage}
					alt={title}
					sx={{ aspectRatio: '16/9', maxHeight: '150px', width: '100%', height: 150, objectFit: 'cover' }}
					onLoad={handleImageLoad}
					onError={handleImageLoad}
					style={{ display: showSkeleton || !imgLoaded ? 'none' : 'block' }}
				/>
				{(showSkeleton || !imgLoaded) && (
					<Skeleton
						animation='wave'
						variant='rectangular'
						width='100%'
						height={150}
						sx={{ position: 'absolute', top: 0, left: 0 }}
					/>
				)}
				{/* Happy Hour Status Chip */}
				{time && !showSkeleton && imgLoaded && (
					<Chip
						label={isHappyHourActive() ? 'Happy Hour' : 'Closed'}
						size='small'
						sx={{
							position: 'absolute',
							top: 8,
							right: 8,
							backgroundColor: isHappyHourActive()
								? 'rgba(76, 175, 80, 0.9)' // Green for active
								: 'rgba(244, 67, 54, 0.9)', // Red for closed
							color: 'white',
							fontWeight: 600,
							fontSize: '0.75rem',
							backdropFilter: 'blur(4px)',
							boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
							'& .MuiChip-label': {
								padding: '0 8px',
							},
						}}
					/>
				)}
			</div>

			{/* Content */}
			<CardContent>
				{showSkeleton ? (
					<Skeleton
						animation='wave'
						variant='text'
					/>
				) : (
					<Typography
						variant='body2'
						color='text.secondary'
						sx={{ fontFamily: 'Rubik', fontSize: '0.8rem' }}>
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
				{showSkeleton ? (
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
				{showSkeleton ? (
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
