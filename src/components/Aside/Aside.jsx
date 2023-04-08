import './Aside.scss';
import placeHolder from '../../assets/images/placeholder.jpg';
import Card from '../Card/Card';

function formatHours(hours) {
   return Object.entries(hours).map(([key, value]) => `${key}: ${value}`);
}

function Aside({ selectedBusiness, geoJson }) {
   const cards = geoJson.features.map((feature) => {
      const { id, name, address, contact_number, website } = feature.properties;
      const hours = feature.properties.hours.flatMap(formatHours);
      return (
         <Card
            key={id}
            title={name.slice(0, 25)}
            subtitle={address}
            number={contact_number}
            imageSrc={placeHolder}
            caption={hours}
            website={website}
         />
      );
   });

   // Move selectedBusiness card to the front of the list
   if (selectedBusiness) {
      const selectedIndex = geoJson.features.findIndex((feature) => feature.properties.name === selectedBusiness);
      const selectedCard = cards.splice(selectedIndex, 1)[0];
      cards.unshift(selectedCard);
   }

   return (
      <div className='aside'>
         <h1 className='aside__title'>Results</h1>
         <ul className='aside__list'>{cards}</ul>
      </div>
   );
}

export default Aside;
