import React from 'react';
import { BsFillClockFill } from 'react-icons/bs';

function OpenTime({ time }) {
	return (
		<div className="restaurant-card__caption">
			<div className="restaurant-card__caption--container">
				<span>
					<BsFillClockFill />
				</span>
				<span className="restaurant-card__caption--title">Happy Hour Time</span>
			</div>
			{time.map((hours, index) => (
				<div key={index}>
					<span className="restaurant-card__caption--text">{hours}</span>
				</div>
			))}
		</div>
	);
}

export default OpenTime;
