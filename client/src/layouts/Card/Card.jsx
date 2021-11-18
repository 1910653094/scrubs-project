import './Card.scss';

const Card = ({ children, title }) => {
	return (
		<div className='card'>
			<h2>{title}</h2>
			{children}
		</div>
	);
};

export default Card;
