import './Card.scss';

function Card({ title, subtitle, imageSrc, caption }) {
   return (
      <div className='card'>
         <div className='card__header'>
            <h2 className='card__title'>{title}</h2>
            <h3 className='card__subtitle'>{subtitle}</h3>
         </div>
         <div className='card__content'>
            <img src={imageSrc} alt={title} />
         </div>
         <p className='card__caption'>{caption}</p>
      </div>
   );
}

export default Card;
