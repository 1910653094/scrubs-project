import { CustomTable, DetailsLink } from '../../../components';
import { PageWrapper, Card } from '../../../layouts';
import NewMember from '../../../components/NewMember/NewMember';
import React, { useEffect, useState } from "react";

const HSStaff = () => {
	const [ employees, setEmployees ] = useState([]);

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
			id: 'action',
			minWidth: 170,
			align: 'right',
		},
	];

	useEffect(() => {
		const fetching = async() => await fetch('http://localhost:9000/employee/all');
		if (employees.length === 0) {
			fetching()
				.then(res => res.json())
				.then(res => {
					res
						.filter(r => r.profession === 'msm')
						.map(r => {
							setEmployees(prev => [ ...prev, {
								name: r.name,
								email: r.email,
								profession: r.profession,
								action: <DetailsLink path='/h/staff/details' state={{ employee: r }} />
							} ]);
						});
				}, error => {
					console.log(`An error occured while fetching: ${error}`);
				});
		}
	}, [employees]);

	return (
		<PageWrapper>
			<h2>Staff Members</h2>
			<NewMember />
			<Card title='Staff Members List'>
				<CustomTable rows={employees} columns={headers} />
			</Card>

		</PageWrapper>
	);
};
export default HSStaff;
