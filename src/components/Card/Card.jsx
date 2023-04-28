import './Card.scss';
import { Link } from 'react-router-dom';
import { ImPhone, ImLocation } from 'react-icons/im';
import { FaBeer, FaHamburger } from 'react-icons/fa';
import { BsStarFill, BsFillClockFill } from 'react-icons/bs';
import { FiArrowDownCircle, FiChevronsRight, FiShare, FiHeart, FiXCircle } from 'react-icons/fi';
import { useState } from 'react';

function Card({ title, address, image, caption, number, drinks, food, website, rating }) {
	const [selectedMenu, setSelectedMenu] = useState('menu');
	const [isLiked, setIsLiked] = useState(false);

	const handleLikeClick = () => {
		setIsLiked(!isLiked);
	};

	const maxRating = 2;
	const ratingIcons = [];

	for (let i = 0; i < maxRating; i++) {
		if (i < rating) {
			ratingIcons.push(<BsStarFill key={i} style={{ color: '#F2BE22', fontSize: '0.8rem' }} />);
		} else {
			ratingIcons.push(<BsStarFill key={i} style={{ color: '#F2BE22', fontSize: '0.8rem' }} />);
		}
	}

	return (
		<li className='restaurant-card'>
			<div className='restaurant-card__header'>
				<h2 className='restaurant-card__title'>{title}</h2>
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
						<div>
							<div className='restaurant-card__info--text-close'>
								<h2 className='restaurant-card__info--text'>
									Drinks Menu
									<FiArrowDownCircle />
								</h2>
								<div style={{ cursor: 'pointer' }} onClick={() => setSelectedMenu('menu')}>
									<span
										style={{
											backgroundColor: 'white',
											display: 'block',
											boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.15)',
											borderRadius: '0.3rem',
											paddingLeft: '0.2rem',
											paddingRight: '0.2rem',
										}}>
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
						</div>
					)}
					{selectedMenu === 'food' && (
						<div>
							<div className='restaurant-card__info--text-close'>
								<h2 className='restaurant-card__info--text'>
									Food Menu
									<FiArrowDownCircle />
								</h2>
								<div style={{ cursor: 'pointer' }} onClick={() => setSelectedMenu('menu')}>
									<span
										style={{
											backgroundColor: 'white',
											display: 'block',
											boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.15)',
											borderRadius: '0.3rem',
											paddingLeft: '0.2rem',
											paddingRight: '0.2rem',
										}}>
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
						</div>
					)}
					<div className='restaurant-card__menu'>
						<ul className='restaurant-card__menu--list'>
							<li
								className={`restaurant-card__menu--item ${selectedMenu === 'drinks' ? 'restaurant-card__menu--item-active' : ''} ${
									selectedMenu !== 'menu' && selectedMenu !== 'drinks' ? 'restaurant-card__menu--item-disabled' : ''
								}`}>
								<Link
									onClick={() => setSelectedMenu('drinks')}
									className={`restaurant-card__menu--link ${
										selectedMenu === 'drinks' ? 'restaurant-card__menu--link-active' : ''
									}`}
									disabled={selectedMenu !== 'menu' && selectedMenu !== 'drinks'}>
									Drinks
									<span>
										<FaBeer />
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
								{number ? number : 'Not available'}
							</li>
							<li className='restaurant-card__contact--item'>
								<div className='restaurant-card__contact--social'>
									<div className='restaurant-card__contact--social-reviews'>
										<p className='restaurant-card__contact--text'>Rating:</p>
										{rating}
										{ratingIcons}
									</div>
									<div className='restaurant-card__contact--social-reactions'>
										<div className='restaurant-card__contact--social-like' onClick={handleLikeClick}>
											{isLiked ? 'Liked' : 'Like'}
											<FiHeart
												className={isLiked ? 'restaurant-card__contact--social-fill' : 'restaurant-card__contact--social-red'}
											/>
										</div>
										<div className='restaurant-card__contact--social-share'>
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
		</li>
	);
}

export default Card;
