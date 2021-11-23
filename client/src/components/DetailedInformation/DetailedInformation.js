import React, { Fragment } from "react";
import "./detailedInformation.scss";
const DetailedInformtaion = (props) => {
  const title = props.title;
  /*props : 
    props:
    title - General Information Staff, General Information Scrubs , General Information Room
    , Giving Details, Borrowing Information, Giving Information
    type, size, color, gender
    fullname, email, profession, gender
    room, room_number
    given_on, given_by
    borrowed_on, given_by, returned_by

*/
  if (title === "General Information Scrubs") {
    return (
      <Fragment>
        <div className="wrapper">
          <h3 className="title">General Information</h3>
          <div className="content">
            <div className="attr">
              <p>TYPE</p>
              <p>COLOR</p>
              <p>GENDER</p>
              <p>SIZE</p>
            </div>
            <div className="value">
              <p>{props.type}</p>
              <p>{props.color}</p>
              <p>{props.gender}</p>
              <p>{props.size}</p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else if (title === "General Information Staff") {
    return (
      <Fragment>
        <div className="content">
          <h3 className="title">General Information</h3>
          <div className="attr">
            <p>FULL NAME</p>
            <p>EMAIL</p>
            <p>PROFESSION</p>
            <p>GENDER</p>
          </div>
          <div className="value">
            <p>{props.fullname}</p>
            <p>{props.email}</p>
            <p>{props.profession}</p>
            <p>{props.gender}</p>
          </div>
        </div>
      </Fragment>
    );
  } else if (title === "General Information Room") {
    return (
      <Fragment>
        <div className="content">
          <h3 className="title">General Information</h3>
          <div className="attr">
            <p>ROOM</p>
            <p>NUMBER</p>
          </div>
          <div className="value">
            <p>{props.room}</p>
            <p>{props.room_number}</p>
          </div>
        </div>
      </Fragment>
    );
  } else if (title === "Giving Details") {
    return (
      <Fragment>
        <div className="content">
          <h3 className="title">General Information</h3>
          <div className="attr">
            <p>GIVEN ON</p>
            <p>BY</p>
          </div>
          <div className="value">
            <p>{props.given_on}</p>
            <p>{props.given_by}</p>
          </div>
        </div>
      </Fragment>
    );
  } else if (title === "Borrowing Information") {
    return (
      <Fragment>
        <div className="wrapper">
          <h3 className="title">Borrowing Information</h3>
          <div className="content">
            <div className="attr">
              <p>BORROWED ON</p>
              <p>GIVEN BY</p>
              <p>RETURNED BY</p>
              <p>ITEMS BORROWED</p>
            </div>
            <div className="value">
              <p>{props.borrowed_on}</p>
              <p>{props.given_by}</p>
              <p>{props.returned_by}</p>
              <p>{props.items_borrowed}</p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else if (title === "Giving Information") {
    return (
      <Fragment>
        <div className="cotent">
          <h3 className="title">Giving Information</h3>
          <div className="attr">
            <p>BORROWED ON</p>
            <p>GIVEN BY</p>
          </div>
          <div className="value">
            <p>{props.borrwed_on}</p>
            <p>{props.given_by}</p>
          </div>
        </div>
      </Fragment>
    );
  }
  return <Fragment>Invalid value delivered.</Fragment>;
};

export default DetailedInformtaion;
