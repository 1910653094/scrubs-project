import { Link } from 'react-router-dom';
import './DetailsLink.scss';

const DetailsLink = ({ path }) => {
	return (
		<Link to={path} className='details-link'>
			Details
		</Link>
	);
};

export default DetailsLink;
