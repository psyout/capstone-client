import { Link } from 'react-router-dom';
import { FiChevronsRight, FiXCircle } from 'react-icons/fi';

function FoodMenu({ selectedMenu, setSelectedMenu, food, website }) {
	return (
		<>
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
		</>
	);
}

export default FoodMenu;
