import './Card.scss';
import { Link } from 'react-router-dom';
import { ImPhone, ImLocation, ImSphere } from 'react-icons/im';
import { FaBeer } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';

function Card({ title, subtitle, imageSrc, caption, paragraph, number, website }) {
   return (
      <li className='card'>
         <div className='card__header'>
            <h2 className='card__title'>{title}</h2>
         </div>
         <div className='card__content'>
            <div className='card__image'>
               <img className='card__image--img' src={imageSrc} alt={title} />
            </div>
            <div className='card__info'>
               <h2 className='card__info--text'>Check the Menu</h2>
               <div className='card__menu'>
                  <ul className='card__menu--list'>
                     <li className='card__menu--item'>
                        <span>
                           <FaBeer />
                        </span>
                        <Link className='card__menu--link'>Drinks</Link>
                     </li>
                     <li className='card__menu--item'>
                        <span>
                           <MdFastfood />
                        </span>
                        <Link className='card__menu--link'>Food</Link>
                     </li>
                  </ul>
               </div>
               <h3 className='card__info--subtitle'>
                  <span>
                     <ImLocation />
                  </span>
                  {subtitle}
               </h3>
               <h3 className='card__info--subtitle'>
                  <span>
                     <ImPhone />
                  </span>
                  {number}
               </h3>
               <Link style={{ color: '#2B2840', textDecoration: 'underline' }} to={website} target='blank' className='card__info--subtitle'>
                  <span>
                     <ImSphere />
                  </span>
                  {website}
               </Link>
            </div>
         </div>
         <div className='card__caption'>
            <h4>Happy Hour Time</h4>
            {caption.map((hours, index) => (
               <p key={index}>{hours}</p>
            ))}
         </div>
      </li>
   );
}

export default Card;
