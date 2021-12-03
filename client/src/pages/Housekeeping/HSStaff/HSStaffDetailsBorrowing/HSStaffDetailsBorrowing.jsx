import { PageWrapper, Card } from '../../../../layouts';
import React from 'react';
import { useLocation } from "react-router-dom";
import DetailedInformation from "../../../../components/DetailedInformation/DetailedInformation";
import { CustomButton } from "../../../../components";
import doctorImg from '../../../../assets/images/doctors-5.jpg';
import './HSStaffDetailsBorrowing.scss';

const HSStaffDetailsBorrowing = () => {
	const location = useLocation();
	const { borrowing } = location.state;

	return (
		<PageWrapper>
			<h2>
				Staff Members > { borrowing.givenBy } > { borrowing.type }
			</h2>
			<Card title='' class_name='flex'>
				<div className="col-1">
					<DetailedInformation
						title="General Information"
						items={[
							{ attr: 'Type', val: borrowing.type },
							{ attr: 'Size', val: borrowing.size },
							{ attr: 'Color', val: borrowing.color },
							{ attr: 'Gender', val: borrowing.gender }
						]}
					/>
					<DetailedInformation
						title="Borrowing Information"
						items={[
							{ attr: 'Borrowed On', val: borrowing.borrowDate },
							{ attr: 'Given By', val: borrowing.givenBy },
							{ attr: 'Return By', val: borrowing.returnBy },
							{ attr: 'Status', val: borrowing.status }
						]}
					/>
				</div>
				<div className="col-2">
					<CustomButton type="primary" text="Remind to Return" />
					<img src={doctorImg} alt="scrub" height={400} width={400} />
				</div>
			</Card>
		</PageWrapper>
	);
};
export default HSStaffDetailsBorrowing;
