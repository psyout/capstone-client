import { FiChevronsRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function DrinksMenu({ drinks, website }) {
	return (
		<>
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
	);
}

export default DrinksMenu;
