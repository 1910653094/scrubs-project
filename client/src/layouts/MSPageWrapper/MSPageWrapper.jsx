import React from "react";
import MSMenu from "../../components/MSMenu/MSMenu";
import "./PageWrapper.scss";

const MSPageWrapper = ({ children }) => {
  return (
    <div className="page-wrapper">
      <MSMenu />
      <div className="content-wrapper">{children}</div>
    </div>
  );
};

export default MSPageWrapper;
