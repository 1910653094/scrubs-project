import { PageWrapper, Card } from '../../../../layouts';
import React from 'react';
import { useLocation } from "react-router-dom";
import DetailedInformation from "../../../../components/DetailedInformation/DetailedInformation";
import {CustomButton, DetailsLink} from "../../../../components";
import doctorImg from '../../../../assets/images/doctors-5.jpg';
import './HSStaffDetailsBorrowing.scss';

const HSStaffDetailsBorrowing = () => {
	const location = useLocation();
	const { borrowing, employee } = location.state;

	return (
		<PageWrapper>
			<h2>
				{
					<DetailsLink
						path='/h/staff'
						style={false}>Staff Members</DetailsLink>
				} > {
				<DetailsLink
					path='/h/staff/details'
					state={{ employee: employee }}
					style={false}>{employee.name}</DetailsLink>
				} > { borrowing.type }
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
					{
						borrowing.status !== "returned" &&
						<CustomButton type="primary" text="Remind to Return"/>
					}
					<img src={doctorImg} alt="scrub" height={400} width={400} />
				</div>
			</Card>
		</PageWrapper>
	);
};
export default HSStaffDetailsBorrowing;
