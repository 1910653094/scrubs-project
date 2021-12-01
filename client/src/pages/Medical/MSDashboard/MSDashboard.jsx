import React from "react";
import RadioButtons from "../../../components/DashboardComponents/RadioButtons";
import { CustomTable, DetailsLink } from "../../../components";
import MSPageWrapper from "../../../layouts/MSPageWrapper/MSPageWrapper";
import "./MSDashboard.scss";
import { ReactComponent as ArrowRight } from "../../../assets/icons/Arrow-Right.svg";
import ActionLink from "../../../components/ActionLink/ActionLink";
const MSDashboard = () => {
  const headers = [
    {
      id: "type",
      label: "Type",
      minWidth: 150,
    },
    {
      id: "items",
      label: "Items",
      minWidth: 100,
    },
    {
      id: "action",
      minWidth: 100,
      align: "right",
    },
  ];
  const data = [
    {
      type: "Gloves",
      items: 10,
      action: <ActionLink path="/m/dashboard" arrow={<ArrowRight />} />,
    },
    {
      type: "Gloves",
      items: 10,
      action: <ActionLink path="/m/dashboard" arrow={<ArrowRight />} />,
    },
    {
      type: "Gloves",
      items: 10,
      action: <ActionLink path="/m/dashboard" arrow={<ArrowRight />} />,
    },
    {
      type: "Gloves",
      items: 10,
      action: <ActionLink path="/m/dashboard" arrow={<ArrowRight />} />,
    },
  ];

  return (
    <MSPageWrapper>
      <div className="ms-your-borrowings">
        <div className="container">
          <div className="title">Your Borrowings</div>
          <div className="banner">
            <RadioButtons />
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
