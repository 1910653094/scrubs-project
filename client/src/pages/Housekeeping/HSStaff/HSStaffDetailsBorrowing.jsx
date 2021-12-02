import { PageWrapper, Card } from '../../../layouts';
import React from 'react';
import { useLocation } from "react-router-dom";
import DetailedInformation from "../../../components/DetailedInformation/DetailedInformation";
import { CustomButton } from "../../../components";
import doctorImg from '../../../assets/images/doctors-5.jpg';
import './HSStaffDetailsBorrowing.scss';

const HSStaffDetailsBorrowing = () => {
	const location = useLocation();
	const { borrowing, status, name } = location.state;

	const toLocaleDate = dateString => {
		const splitted = dateString.split(' ');
		return new Date(splitted[0]).toLocaleDateString();
	};

	return (
		<PageWrapper>
			<h2>
				Staff Members > { name } > { borrowing.description }
			</h2>
			<Card title='' class_name='flex'>
				<div className="col-1">
					<DetailedInformation
						title="General Information"
						items={[
							{ attr: 'Type', val: borrowing.description },
							{ attr: 'Size', val: borrowing.size },
							{ attr: 'Color', val: borrowing.color },
							{ attr: 'Gender', val: borrowing.gender }
						]}
					/>
					<DetailedInformation
						title="Borrowing Information"
						items={[
							{ attr: 'Borrowed On', val: toLocaleDate(borrowing.borrowed_date) },
							{ attr: 'Given By', val: borrowing.name },
							{ attr: 'Return By', val: toLocaleDate(borrowing.return_by) },
							{ attr: 'Status', val: status }
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
