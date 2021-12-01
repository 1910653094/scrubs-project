import { CustomTable, DetailsLink } from '../../../components';
import { PageWrapper, Card } from '../../../layouts';
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HSStaffDetails = () => {
    const [ borrowings, setBorrowings ] = useState([]);

    const location = useLocation();
    const { employee } = location.state;

    const headers = [
        {
            id: 'description',
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
            id: 'quantity',
            label: 'Total items',
            minWidth: 120,
            align: 'left',
        },
        {
            id: 'borrowed_on',
            label: 'Borrowed on',
            minWidth: 120,
            align: 'left',
        },
        {
            id: 'return_by',
            label: 'Return by',
            minWidth: 120,
            align: 'left',
        },
        {
            id: 'status', // completely returned -> needs to be mapped
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

    useEffect(() => {
        const fetching = async () => await fetch(`http://localhost:9000/history/fromEmployee?id=${employee.id_employee}`);
        if (borrowings.length === 0) {
            fetching()
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    res.map(r => {
                        const return_date = new Date(r.return_by.split('T')[0]);
                        let status = r.completely_returned ? "Returned" : "Borrowing";

                        if (return_date < new Date()) {
                            status = "Overdue";
                        }

                        setBorrowings(prev => [ ...prev, {
                            description: r.description,
                            size: r.size,
                            color: r.color,
                            quantity: r.quantity,
                            borrowed_on: r.borrowed_date.split('T')[0],
                            return_by: r.return_by.split('T')[0],
                            status: status,
                            action: <DetailsLink path='/h/staff/details/borrowing' state={{ borrowing: r }} />
                        } ]);
                    });
                }, error => {
                    console.log("An error occurred while fetching: " + error);
                });
        }
    }, [borrowings]);

    return (
        <PageWrapper>
            <h2>Staff Members > { employee.name }</h2>
            <Card title=''>
                <CustomTable rows={borrowings} columns={headers} />
            </Card>
        </PageWrapper>
    );
};
export default HSStaffDetails;
