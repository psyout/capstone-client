import React from 'react';
import { BsFillClockFill } from 'react-icons/bs';

function OpenTime({ time }) {
	return (
		<div className='restaurant-card__caption'>
			<div className='restaurant-card__caption--container'>
				<span>
					<BsFillClockFill />
				</span>
				<h4 className='restaurant-card__caption--title'>Happy Hour Time</h4>
			</div>
			{time.map((hours, index) => (
				<React.Fragment key={index}>
					<span className='restaurant-card__caption--text'>{hours}</span>
				</React.Fragment>
			))}
		</div>
	);
}

export default OpenTime;
