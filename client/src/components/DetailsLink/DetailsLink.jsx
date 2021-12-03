import { Link } from 'react-router-dom';
import './DetailsLink.scss';

const DetailsLink = ({ path, state = '', children }) => {
	return (
		<Link to={path} state={state} className='details-link'>
			{children || 'Details'}
		</Link>
	);
};

export default DetailsLink;
