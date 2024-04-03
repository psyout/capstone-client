import './Card.scss';
import { Link } from 'react-router-dom';
import { ImPhone, ImLocation } from 'react-icons/im';
import { FaBeer, FaHamburger } from 'react-icons/fa';
import { BsStarFill, BsStarHalf, BsFillClockFill } from 'react-icons/bs';
import { FiArrowDownCircle, FiChevronsRight, FiShare, FiHeart, FiXCircle, FiFacebook, FiMail, FiTwitter } from 'react-icons/fi';

import { useState } from 'react';

function Card({ title, address, image, caption, contact_number, drinks, food, website, rating, url }) {
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

	const maxRating = 1;
	const ratingIcons = [];

	for (let i = 0; i < maxRating; i++) {
		if (i < rating) {
			ratingIcons.push(<BsStarFill key={i} style={{ color: '#F2BE22', fontSize: '0.8rem' }} />);
		} else {
			ratingIcons.push(<BsStarHalf key={i} style={{ color: '#F2BE22', fontSize: '0.8rem' }} />);
		}
	}

	return (
		<li className='restaurant-card'>
			<div className='restaurant-card__header'>
				<h2 className='restaurant-card__title'>{title.slice(0, 26)}</h2>
			</div>
			<div className={`restaurant-card__content ${selectedMenu !== 'menu' ? 'restaurant-card__content--full-width' : ''}`}>
				<div className={`restaurant-card__image ${selectedMenu === 'menu' ? '' : 'restaurant-card__image--hidden'}`}>
					<img className='restaurant-card__image--img restaurant-card__image--blend' src={image} alt={title} />
				</div>
				<div className='restaurant-card__info'>
					{selectedMenu === 'menu' && (
						<h2 className='restaurant-card__info--text'>
							Check the Menu
							<FiArrowDownCircle />
						</h2>
					)}
					{selectedMenu === 'drinks' && (
						<>
							<div className='restaurant-card__info--text-close'>
								<div style={{ cursor: 'pointer' }} onClick={() => setSelectedMenu('menu')}>
									<span>
										<h2 className='restaurant-card__info--text'>
											Close
											<FiXCircle />
										</h2>
									</span>
								</div>
							</div>
							<div className='restaurant-card__menu'>
								<ul className='restaurant-card__menu--list-drinks'>
									{drinks.map((drink, index) => (
										<li className='restaurant-card__menu--item-drinks' key={index}>
											{drink}
										</li>
									))}
								</ul>
								<Link to={website} target='blank' className='restaurant-card__menu--item-website'>
									Check their full menu here
									<span>
										<FiChevronsRight />
									</span>
								</Link>
							</div>
						</>
					)}
					{selectedMenu === 'food' && (
						<>
							<div className='restaurant-card__info--text-close'>
								<div style={{ cursor: 'pointer' }} onClick={() => setSelectedMenu('menu')}>
									<span>
										<h2 className='restaurant-card__info--text'>
											Close
											<FiXCircle />
										</h2>
									</span>
								</div>
							</div>

							<div className='restaurant-card__menu'>
								<ul className='restaurant-card__menu--list-food'>
									{food.map((food, index) => (
										<li className={'restaurant-card__menu--item-food'} key={index}>
											{food}
										</li>
									))}
								</ul>
								<Link to={website} target='blank' className='restaurant-card__menu--item-website'>
									Check their full menu here
									<span>
										<FiChevronsRight />
									</span>
								</Link>
							</div>
						</>
					)}
					<div className='restaurant-card__menu'>
						<ul className='restaurant-card__menu--list'>
							<li
								className={`restaurant-card__menu--item ${selectedMenu === 'drinks' ? 'restaurant-card__menu--item-active' : ''} ${
									selectedMenu !== 'menu' && selectedMenu !== 'drinks' ? 'restaurant-card__menu--item-disabled' : ''
								}`}>
								<Link
									onClick={() => setSelectedMenu('drinks')}
									className={`restaurant-card__menu--link ${selectedMenu === 'drinks' ? 'restaurant-card__menu--link-active' : ''}`}
									disabled={selectedMenu !== 'menu' && selectedMenu !== 'drinks'}>
									Drinks
									<span>
										<FaBeer style={{ marginLeft: '0.1rem' }} />
									</span>
								</Link>
							</li>

							<li
								className={`restaurant-card__menu--item ${selectedMenu === 'food' ? 'restaurant-card__menu--item-active' : ''} ${
									selectedMenu !== 'menu' && selectedMenu !== 'food' ? 'restaurant-card__menu--item-disabled' : ''
								}`}>
								<Link
									onClick={() => setSelectedMenu('food')}
									className={`restaurant-card__menu--link ${selectedMenu === 'food' ? 'restaurant-card__menu--link-active' : ''}`}
									disabled={selectedMenu !== 'menu' && selectedMenu !== 'food'}>
									Food
									<span>
										<FaHamburger />
									</span>
								</Link>
							</li>
						</ul>
					</div>
					<div className='restaurant-card__contact'>
						<ul className='restaurant-card__contact--list'>
							<div className='restaurant-card__contact--container'>
								<li className='restaurant-card__contact--item'>
									<span>
										<ImLocation />
									</span>
									{address}
								</li>
								<li className='restaurant-card__contact--item'>
									<span>
										<ImPhone />
									</span>
									{contact_number ? (
										<a style={{ color: '#2c3359' }} href={`tel:${contact_number}`}>
											{contact_number}
										</a>
									) : (
										'Not available'
									)}
								</li>
							</div>

							<li className='restaurant-card__contact--item'>
								<div className='restaurant-card__contact--social'>
									<div className='restaurant-card__contact--social-reviews'>
										<p className='restaurant-card__contact--text'>Rating:</p>
										{rating}
										&nbsp;
										{ratingIcons}
									</div>
									<div className='restaurant-card__contact--social-reactions'>
										<div className='restaurant-card__contact--social-like' onClick={handleLikeClick}>
											{isLiked ? 'Liked' : 'Like'}
											<FiHeart className={isLiked ? 'restaurant-card__contact--social-fill' : 'restaurant-card__contact--social-red'} />
										</div>
										<div className='restaurant-card__contact--social-share' onClick={toggleLightbox}>
											Share
											<FiShare className='restaurant-card__contact--social-red' />
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className='restaurant-card__caption'>
				<div className='restaurant-card__caption--container'>
					<span>
						<BsFillClockFill />
					</span>
					<h4 className='restaurant-card__caption--title'>Happy Hour Time</h4>
				</div>
				{caption.map((hours, index) => (
					<p key={index} className='restaurant-card__caption--text'>
						{hours}
					</p>
				))}
			</div>

			{lightboxOpen && (
				<div className='lightbox'>
					<div className='lightbox__content'>
						<span className='close-btn' onClick={toggleLightbox}>
							<FiXCircle />
						</span>
						<h2 className='lightbox__content--title'>Share</h2>
						<h3 className='lightbox__content--name'>{title}</h3>
						<p className='lightbox__content--address'>{address}</p>
						<div className='lightbox__content--copy'>
							<p>Link to share</p>
							<div className='lightbox__content--container'>
								<Link className='lightbox__content--container-url' to={url} target='blank'>
									{url.length > 30 ? url.slice(0, 30) + '...' : url}
								</Link>
								<button onClick={copyLinkOnClick}>{!copied ? 'Copy link' : 'Copied!'}</button>
							</div>
						</div>
						<div className='lightbox__content--social'>
							<FiFacebook onClick={shareOnFacebook} />
							<FiTwitter onClick={shareOnTwitter} />
							<FiMail onClick={shareOnGmail} />
						</div>
					</div>
				</div>
			)}
		</li>
	);
}

export default Card;
