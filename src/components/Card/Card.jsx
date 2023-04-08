import './Card.scss';
import { Link } from 'react-router-dom';
import { ImPhone, ImLocation } from 'react-icons/im';
import { FaBeer, FaHamburger } from 'react-icons/fa';
import { BsStarFill, BsStar, BsStarHalf, BsFillClockFill } from 'react-icons/bs';
import { FiArrowDownCircle } from 'react-icons/fi';
import { useState } from 'react';

function Card({ title, address, imageSrc, caption, number, drinks, food }) {
   const [selectedMenu, setSelectedMenu] = useState('menu');
   // eslint-disable-next-line
   const [isDisabled, setIsDisabled] = useState(false);

   return (
      <li className='restaurant-card'>
         <div className='restaurant-card__header'>
            <h2 className='restaurant-card__title'>{title}</h2>
         </div>
         <div className={`restaurant-card__content ${selectedMenu !== 'menu' ? 'restaurant-card__content--full-width' : ''}`}>
            <div className={`restaurant-card__image ${selectedMenu === 'menu' ? '' : 'restaurant-card__image--hidden'}`}>
               <img className='restaurant-card__image--img' src={imageSrc} alt={title} />
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
                     <h2 className='restaurant-card__info--text'>
                        Drinks Menu
                        <FiArrowDownCircle />
                     </h2>
                     <div className='restaurant-card__menu'>
                        <ul className='restaurant-card__menu--list-drinks'>
                           {drinks.map((drink, index) => (
                              <li className='restaurant-card__menu--item-drinks' key={index}>
                                 {drink}
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               )}
               {selectedMenu === 'food' && (
                  <div>
                     <h2 className='restaurant-card__info--text'>
                        Food Menu
                        <FiArrowDownCircle />
                     </h2>
                     <div className='restaurant-card__menu'>
                        <ul className='restaurant-card__menu--item-list'>
                           {food.map((food, index) => (
                              <li className='restaurant-card__menu--item-food' key={index}>
                                 {food}
                              </li>
                           ))}
                        </ul>
                        <p className='restaurant-card__menu--item-text'>Please advise the server of any allergies.</p>
                        <p className='restaurant-card__menu--item-text'>
                           Tax not included. 18% gratuity may be added to groups of six or more
                        </p>
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
                        {number}
                     </li>
                     <li className='restaurant-card__contact--item'>
                        <p className='restaurant-card__contact--text'>Reviews</p>
                        <BsStarFill style={{ color: '#F2BE22' }} />
                        <BsStarFill style={{ color: '#F2BE22' }} />
                        <BsStarFill style={{ color: '#F2BE22' }} />
                        <BsStarHalf style={{ color: '#F2BE22' }} />
                        <BsStar style={{ color: '#F2BE22' }} />
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
