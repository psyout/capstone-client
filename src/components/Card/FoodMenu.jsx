import { Link } from 'react-router-dom';
import { FiChevronsRight } from 'react-icons/fi';

function FoodMenu({ food, website }) {
	return (
		<>
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
	);
}

export default FoodMenu;
