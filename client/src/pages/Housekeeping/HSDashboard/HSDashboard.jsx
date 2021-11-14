import React from 'react';
import ScrubActions from '../../../components/DashboardComponents/ScrubActions';
import '../../../css/dashboard.css';


const HSDashboard = () => {
	return <div>
		<div className="content">
			<h2>Dashboard</h2>
			<div className="container">
				<div className="item1">
					<div className="item3">
					<div className="component" id="scrub-action"><ScrubActions/></div>
					<div className="component" id="general-scrub-info">General Scrub</div>
					</div>
					<div className="component" id="staff-members-info">Staff members information</div>
				</div>
				<div className="item2">
				<div  className="component" id="recent-activities">Recent Activities</div>
				<div  className="component" id="scrub-rooms">Scrub Rooms</div>
				</div>  
			</div>     
		</div>
	</div>;

};
export default HSDashboard;
