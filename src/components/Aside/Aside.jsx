import './Aside.scss';
import placeHolder from '../../assets/images/placeholder.jpg';
import Card from '../Card/Card';

function formatHours(hours) {
   return Object.entries(hours).map(([key, value]) => `${key}: ${value}`);
}

function formatDrinks(drinks) {
   return Object.entries(drinks).map(([key, value]) => (
      <div>
         {key}: <strong>{value}</strong>
      </div>
   ));
}

function formatFood(food) {
   return Object.entries(food).map(([key, value]) => (
      <div>
         {key}: <strong>{value}</strong>
      </div>
   ));
}

function Aside({ selectedBusiness, setSelectedBusiness, geoJson }) {
   const cards = geoJson.features.map((feature) => {
      const { id, name, address, contact_number } = feature.properties;

      const hours = feature.properties.hours.flatMap(formatHours);

      const drinks = feature.properties.drinks ? feature.properties.drinks.flatMap(formatDrinks) : [];

      const food = feature.properties.food ? feature.properties.food.flatMap(formatFood) : [];

      const handleClick = () => {
         setSelectedBusiness(name);
      };

      return (
         <Card
            key={id}
            title={name.slice(0, 25)}
            address={address}
            number={contact_number}
            imageSrc={placeHolder}
            caption={hours}
            drinks={drinks}
            food={food}
            onClick={handleClick}
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
