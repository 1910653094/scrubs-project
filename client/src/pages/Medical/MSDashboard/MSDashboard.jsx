import React from "react";
import MSMenu from "../../../components/MSMenu/MSMenu";
import "./MSDashboard.scss";

const MSDashboard = () => {
  return (
    <div id="outer-container">
      <MSMenu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      <div id="page-wrap">
        <h1>Cool Restaurant 🍔🍕</h1>
        <h2>Check out our offerings in the sidebar!</h2>
      </div>
    </div>
  );
};

export default MSDashboard;
