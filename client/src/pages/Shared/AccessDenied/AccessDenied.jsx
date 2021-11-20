import { Link } from 'react-router-dom';

const AccessDenied = () => {
	return (
		<div>
			You are not authorized to view this page.
			<Link to='/login'>Back</Link>
		</div>
	);
};
export default AccessDenied;
