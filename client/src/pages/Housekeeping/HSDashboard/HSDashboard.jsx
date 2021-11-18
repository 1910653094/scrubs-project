import React from 'react';
import { PageWrapper, Card } from '../../../layouts';
import './HSDashboard.scss';
import ScrubActions from '../../../components/DashboardComponents/ScrubActions';
import RadioButtons from '../../../components/DashboardComponents/RadioButtons';

const HSDashboard = () => {
	return (
		<PageWrapper>
			<h2>Dashboard</h2> {/**BREADCRUMBS LATER */}
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
