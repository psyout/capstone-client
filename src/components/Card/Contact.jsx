import { ImPhone, ImLocation } from 'react-icons/im';
import { FiShare, FiHeart } from 'react-icons/fi';

function Contact({ address, contact_number, rating, ratingIcons, handleLikeClick, isLiked, toggleLightbox }) {
	return (
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
	);
}

export default Contact;
