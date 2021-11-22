import React from 'react';
import { CustomTable, DetailsLink } from '../../../components';
import { PageWrapper, Card } from '../../../layouts';
import './HSDashboard.scss';
import ScrubActions from '../../../components/DashboardComponents/ScrubActions';
import RadioButtons from '../../../components/DashboardComponents/RadioButtons';

const HSDashboard = () => {
	const headers = [
		{
			id: 'name',
			label: 'Name',
			minWidth: 150,
		},
		{
			id: 'email',
			label: 'Email',
			minWidth: 200,
		},
		{
			id: 'profession',
			label: 'Profession',
			minWidth: 120,
			align: 'left',
		},
		{
			id: 'borrowings',
			label: 'Borrowings',
			minWidth: 170,
			align: 'right',
		},
		{
			id: 'action',
			minWidth: 170,
			align: 'right',
		},
	];

	const data = [
		{
			name: 'David Bester',
			email: 'besterdavid01@gmail.com',
			profession: 'Doctor',
			borrowings: '10',
			action: <DetailsLink path='/h/dashboard' />,
		},
		{
			name: 'David Bester',
			email: 'besterdavid01@gmail.com',
			profession: 'Doctor',
			borrowings: '10',
			action: <DetailsLink path='/h/dashboard' />,
		},
	];
	return (
		<PageWrapper>
			<h2>Dashboard</h2>
			<div className='cards'>
				<div className='col five'>
					<div className='row one'>
						<div className='col two'>
							<Card title='Scrub Actions'>
								<ScrubActions />
							</Card>
						</div>
						<div className='col three'>
							<Card title='General Scrub Information' />
						</div>
					</div>
					<div className='row two'>
						<Card title='Staff Member Information'>
							<RadioButtons />
							{data.length >= 1 ? (
								<CustomTable columns={headers} rows={data} />
							) : (
								<div>No data available</div>
							)}
						</Card>
					</div>
				</div>
				<div className='col two'>
					<div className='row five'>
						<Card title='Recent Activites' />
					</div>
					<div className='row four'>
						<Card title='Scrub Rooms' />
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};
export default HSDashboard;
