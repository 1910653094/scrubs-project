import { CustomTable } from '../../../components';
import { PageWrapper, Card } from '../../../layouts';
import NewMember from '../../../components/NewMember/NewMember';


const HSStaff = () => {
	return (
		<PageWrapper>
			<h2>Staff Members</h2>
			<NewMember />
			<Card title='Staff Members List'>
				<CustomTable rows={[]} columns={[]} />
			</Card>

		</PageWrapper>
	);
};
export default HSStaff;
