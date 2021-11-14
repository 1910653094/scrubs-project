import React from 'react'
import '../components/dashboard/dashboard.css';
import ScrubActions ,{ useState }from '../components/dashboard/components-dashboard/ScrubActions';
/*
function Dashboard() {
    return (
        <div >
            <Dashboard></Dashboard>
        </div>
    );
}
*/


//const Dashboard  = ()=>{
 function Dashboard(){
  return(
   
    <div className="content">
      <h2>Dashboard</h2>
      <div className="container">
        <div className="item1">
            <div className="item3">
              <div className="component" id="scrub-action"><ScrubActions/></div>
              <div className="component" id="general-scrub-info">General Scrub</div>
            </div>
            <div className="component" id="staff-members-info">Staff members information</div>
        </div>
        <div className="item2">
          <div  className="component" id="recent-activities">Recent Activities</div>
          <div  className="component" id="scrub-rooms">Scrub Rooms</div>
        </div>  
      </div>
      
    </div>
  );
}

export default Dashboard;




