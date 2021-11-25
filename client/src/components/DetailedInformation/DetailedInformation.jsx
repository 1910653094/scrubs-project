import React from 'react';
import './DetailedInformation.scss';

const DetailedInformtaion = ({ title, items }) => {
	return (
		<div className='detailed-information'>
			<h3 className='title'>{title}</h3>
			<ul className='list'>
				{items &&
					items.map(({ attr, val }) => {
						return (
							<li className='item'>
								<div className='attribute'>{attr}</div>
								<div className='value'>{val}</div>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default DetailedInformtaion;
