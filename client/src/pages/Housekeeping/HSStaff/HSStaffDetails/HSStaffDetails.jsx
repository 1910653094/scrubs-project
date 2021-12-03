import React, { useEffect } from 'react';
import {
	CustomTable,
	DetailedInformation,
	DetailsLink,
	Spinner,
	Status,
} from '../../../../components';
import { PageWrapper, Card } from '../../../../layouts';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	cleanBorrowings,
	getBorrowings,
} from '../../../../redux/features/borrowings/borrowingsSlice';

const HSStaffDetails = () => {
	const location = useLocation();
	const { employee } = location.state;

	const headers = [
		{
			id: 'type',
			label: 'Scrub Type',
			minWidth: 120,
		},
		{
			id: 'size',
			label: 'Size',
			minWidth: 100,
		},
		{
			id: 'color',
			label: 'Color',
			minWidth: 120,
			align: 'left',
		},
		{
			id: 'amount',
			label: 'Total items',
			minWidth: 120,
			align: 'left',
		},
		{
			id: 'borrowDate',
			label: 'Borrowed on',
			minWidth: 120,
			align: 'left',
		},
		{
			id: 'returnBy',
			label: 'Return by',
			minWidth: 120,
			align: 'left',
		},
		{
			id: 'status',
			label: 'status',
			minWidth: 120,
			align: 'left',
		},
		{
			id: 'action',
			minWidth: 170,
			align: 'right',
		},
	];

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getBorrowings(employee.id_employee));

		return () => {
			dispatch(cleanBorrowings());
		};
	}, []);

	const { isLoading, data, error } = useSelector(
		({ borrowings }) => borrowings
	);

	return (
		<PageWrapper>
			<h2>
				Staff Members {'>'} {employee.name}
			</h2>
			<Card title=''>
				<DetailedInformation
					title='General Information'
					items={[
						{ attr: 'Full Name', val: employee.name },
						{ attr: 'Email', val: employee.email },
						{ attr: 'Profession', val: employee.profession },
						{ attr: 'Gender', val: employee.gender },
					]}
				/>
				{isLoading ? (
					<Spinner />
				) : data.length > 0 ? (
					<CustomTable
						rows={data.map((r) => {
							return {
								type: r.type,
								size: r.size,
								color: r.color,
								amount: r.amount,
								borrowDate: r.borrowDate,
								returnBy: r.returnBy,
								status:
									(r.status && <Status type={r.status} />) || 'Unknown Status',
								action: (
									<DetailsLink
										path='/h/staff/details/borrowing'
										state={{ borrowing: r }}
									/>
								),
							};
						})}
						columns={headers}
					/>
				) : (
					<div style={{ marginTop: '40px' }}>No data available</div>
				)}
			</Card>
		</PageWrapper>
	);
};
export default HSStaffDetails;
