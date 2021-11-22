import { CustomTable } from '../../../components';
import { PageWrapper, Card } from '../../../layouts';

const HSStaff = () => {
	return (
		<PageWrapper>
			<h2>Staff Members</h2>
			<Card title='Staff Members List'>
				<CustomTable rows={[]} columns={[]} />
			</Card>
		</PageWrapper>
	);
};
export default HSStaff;
