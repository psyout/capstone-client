import { useState } from 'react';
import './Sidebar.scss';

function Sidebar({ restaurants }) {
   const [selectedRestaurant, setSelectedRestaurant] = useState(null);

   const handleRestaurantClick = (restaurant) => {
      setSelectedRestaurant(restaurant);
   };

   return (
      <div className='sidebar'>
         <h2>Heello</h2>
         {restaurants &&
            restaurants.map((restaurant) => (
               <div key={restaurant.id} onClick={() => handleRestaurantClick(restaurant)}>
                  {restaurant.name}
               </div>
            ))}
         {selectedRestaurant && (
            <div className='selected-restaurant'>
               <h3>{selectedRestaurant.name}</h3>
               <p>{selectedRestaurant.location.address1}</p>
               <p>
                  {selectedRestaurant.location.city}, {selectedRestaurant.location.state} {selectedRestaurant.location.zip_code}
               </p>
               <p>
                  Rating: {selectedRestaurant.rating} | Reviews: {selectedRestaurant.review_count}
               </p>
            </div>
         )}
      </div>
   );
}

export default Sidebar;
