import React, { useEffect, useState } from "react";
import RadioButtons from "../../../components/DashboardComponents/RadioButtons";
import { CustomTable } from "../../../components";
import MSPageWrapper from "../../../layouts/MSPageWrapper/MSPageWrapper";
import { ReactComponent as ArrowRight } from "../../../assets/icons/Arrow-Right.svg";
import ActionLink from "../../../components/ActionLink/ActionLink";
import "./MSDashboard.scss";

const MSDashboard = () => {
  const [ borrowings, setBorrowings ] = useState([]);
  const [ data, setData ] = useState([]);

  const headers = [
    {
      id: "type",
      label: "Type",
      minWidth: 130,
    },
    {
      id: "amount",
      label: "Total items",
      minWidth: 80,
    },
    {
      id: "action",
      minWidth: 80,
      align: "right",
    },
  ];

  useEffect(() => {
    const fetching = async () =>
        await fetch(
            `http://localhost:9000/history/fromEmployee?id=3`
        );
    if (borrowings.length === 0) {
      fetching()
          .then((res) => res.json())
          .then(res => {
                res.map((r) => {
                  setBorrowings(prev => [ ...prev, r ]);
                  if (r.status === 'overdue') {  //
                    setData(prev => [
                      ...prev,
                      {
                        type: r.type,
                        amount: r.amount,
                        action: (
                            <ActionLink path="/m/dashboard" arrow={<ArrowRight />} />
                        )
                      }
                    ]);
                  }
                });
              },
              (error) => {
                console.log('An error occurred while fetching: ' + error);
              }
          );
    }
  }, [ borrowings ]);

  const handleValueChange = value => {
    if (value === 0) {
      setData(
          borrowings
              .filter(b => b.status === 'overdue')
              .map(b => {
                return {
                  type: b.type,
                  amount: b.amount,
                  action: (
                      <ActionLink path="/m/dashboard" arrow={<ArrowRight />} />
                  )
                };
              })
      );
    } else if (value === 1) {
      setData(
          borrowings
              .filter(b => b.status === 'borrowed')
              .map(b => {
                return {
                  type: b.type,
                  amount: b.amount,
                  action: (
                      <ActionLink path="/m/dashboard" arrow={<ArrowRight />} />
                  )
                };
              })
      );
    } else {
      setData(
          borrowings
              .filter(b => b.status === 'returned')
              .map(b => {
                return {
                  type: b.type,
                  amount: b.amount,
                  action: (
                      <ActionLink path="/m/dashboard" arrow={<ArrowRight />} />
                  )
                };
              })
      );
    }
  };

  return (
    <MSPageWrapper>
      <div className="ms-your-borrowings">
        <div className="container">
          <div className="title">Your Borrowings</div>
          <div className="banner">
            <RadioButtons onValueChange={handleValueChange}/>
          </div>
          <div className="ms-table">
            {data.length >= 1 ? (
                <CustomTable columns={headers} rows={data} />
            ) : (
                <div>No data available</div>
            )}
          </div>
        </div>
      </div>
    </MSPageWrapper>
  );
};

export default MSDashboard;
