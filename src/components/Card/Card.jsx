import './Card.scss';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';

import Lightbox from './Lightbox';
import Menu from './Menu';
import OpenTime from './OpenTime';
import Contact from './Contact';
import DrinksMenu from './DrinksMenu';
import FoodMenu from './FoodMenu';

import { useState } from 'react';

function Card({ title, address, images, time, contact_number, drinks, food, website, rating, url }) {
	const [selectedMenu, setSelectedMenu] = useState('menu');
	const [isLiked, setIsLiked] = useState(false);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [copied, setCopied] = useState(false);

	const shareOnFacebook = () => {
		const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
		window.open(facebookUrl, '_blank');
	};

	const shareOnGmail = () => {
		const gmailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
		window.location.href = gmailUrl;
	};

	const shareOnTwitter = () => {
		const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
		window.open(twitterUrl, '_blank');
	};

	const handleLikeClick = () => {
		setIsLiked(!isLiked);
	};

	const toggleLightbox = () => {
		setLightboxOpen(!lightboxOpen);
	};

	const copyLinkOnClick = () => {
		navigator.clipboard
			.writeText(url)
			.then(() => {
				setCopied(true);
			})
			.catch((error) => {
				console.error('Failed to copy URL: ', error);
			});
	};

	const maxRating = 5;
	const ratingIcons = [];

	// Calculate integer and decimal
	const integerPart = Math.floor(rating);
	const decimalPart = rating - integerPart;

	for (let i = 0; i < maxRating; i++) {
		if (i < integerPart) {
			ratingIcons.push(<BsStarFill key={i} style={{ color: '#F2BE22', fontSize: '0.8rem' }} />);
		} else if (i === integerPart && decimalPart > 0) {
			ratingIcons.push(<BsStarHalf key={i} style={{ color: '#F2BE22', fontSize: '0.8rem' }} />);
		} else {
			break; // Stop the loop
		}
	}

	return (
		<li className='restaurant-card'>
			<div className={`restaurant-card__content ${selectedMenu !== 'menu' ? 'restaurant-card__content--full-width' : ''}`}>
				<div className={`restaurant-card__image ${selectedMenu === 'menu' ? '' : 'restaurant-card__image--hidden'}`}>
					<h2 className='restaurant-card__image--title'>{title}</h2>

					<img className='restaurant-card__image--img' src={images} alt={title} />
				</div>
				<div className='restaurant-card__info'>
					<DrinksMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} drinks={drinks} website={website} />

					<FoodMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} food={food} website={website} />

					<Menu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />

					<Contact contact_number={contact_number} address={address} rating={rating} ratingIcons={ratingIcons} handleLikeClick={handleLikeClick} isLiked={isLiked} toggleLightbox={toggleLightbox} />
				</div>
			</div>

			<OpenTime time={time} />

			<Lightbox
				lightboxOpen={lightboxOpen}
				toggleLightbox={toggleLightbox}
				title={title}
				address={address}
				url={url}
				copied={copied}
				copyLinkOnClick={copyLinkOnClick}
				shareOnFacebook={shareOnFacebook}
				shareOnTwitter={shareOnTwitter}
				shareOnGmail={shareOnGmail}
			/>
		</li>
	);
}

export default Card;
