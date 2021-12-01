import { PageWrapper, Card } from '../../../layouts';
import { DetailedInformation } from '../../../components';

const HSProfile = () => {
	return (
		<PageWrapper>
			<h2>Profile</h2>
			<Card>
				<DetailedInformation
					items={[
						{ attr: 'Full Name', val: 'dr. Mike Wazowski' },
						{ attr: 'Email', val: 'mike.wazowski@gmail.com' },
						{ attr: 'Profession', val: 'Doctor' },
						{ attr: 'Gender', val: 'Male' },
					]}
				/>
			</Card>
		</PageWrapper>
	);
};
export default HSProfile;
