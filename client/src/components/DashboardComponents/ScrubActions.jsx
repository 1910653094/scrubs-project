import React, { useState } from 'react';
import Modal from './Modal';
import BodyBlackoutStyle from './BodyBlackoutStyle';
import ScrubsToRoom from '../ScrubsToRoom/ScrubsToRoom';
import ScrubsToStaffMember from '../ScrubsToStaffMember/ScrubsToStaffMember';
import './ScrubActions.scss';

function ScrubActions() {
	let [modalGiveScrub, modalGiveScrubChange] = useState(false);
	// let [modalAssignRoom, modalAssignRoomChange] = useState(false);

	const onGSModal = (active) => {
		modalGiveScrubChange(active);
	};
	// const onARModal = (active) => {
	// 	modalAssignRoomChange(active);
	// };
	return (
		<div className='scrub-actions'>
			<div className='scrub-actions-div'>
				<ScrubsToStaffMember />
				<ScrubsToRoom />
				<button id='s-c-red' className='scrub-actions-box'>
					Report
				</button>
			</div>
			<div>
				{modalGiveScrub && <BodyBlackoutStyle onGSModal={onGSModal} />}
				{modalGiveScrub && (
					<Modal modalGiveScrubChange={modalGiveScrubChange} />
				)}
			</div>
		</div>
	);
}

export default ScrubActions;
