import './Card.scss';

const Card = ({ children, title }) => {
	return (
		<div className='card'>
			<h2>{title}</h2>
			<div className='card-content'>{children}</div>
		</div>
	);
};

export default Card;
