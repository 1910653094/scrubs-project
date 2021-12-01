import { Link } from 'react-router-dom';
import './DetailsLink.scss';

const DetailsLink = ({ path, state = '' }) => {
	return (
		<Link to={path} state={state} className='details-link'>
			Details
		</Link>
	);
};

export default DetailsLink;
