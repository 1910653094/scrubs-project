import { ReactComponent as BurgerIcon } from "../../../assets/icons/Burgericon.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/Arrow-Left.svg";
import { ReactComponent as Report } from "../../../assets/icons/Report.svg";
import { CustomButton } from "../../../components";
import { DetailedInformation } from "../../../components";
import { Status } from "../../../components";
import { Input } from "../../../components";
import { COLORS } from "../../../assets";
import "./MSScrubsDetails.scss";

const MSProfile = () => {
  return (
    <div className="ms-scrubs-details">
      <div className="burger-icon">
        <BurgerIcon />
      </div>
      <div className="container">
        <div className="action-container">
          <div className="go-back-container">
            <div className="arrow-left">
              <ArrowLeft />
            </div>
            <div className="back-text"> Gloves</div>
          </div>
          <div className="report-item-container">
            <div className="report-icon">
              <Report />
            </div>
            <CustomButton
              text="Report item"
              textColor={COLORS.genericRed}
              type="tertiary"
              fontSize="14px"
              letterSpacing="0.01em"
            />
          </div>
        </div>
        <div className="status-icon">
          <Status type="overdue" />
        </div>
        <div className="detailed-info-container">
          <DetailedInformation
            title="Scrubs information"
            items={[
              { attr: "type", val: "Doctor" },
              { attr: "color", val: "Green" },
              { attr: "Gender", val: "Male" },
              { attr: "size", val: "L" },
            ]}
          />
          <DetailedInformation
            title="Borrowing information"
            items={[
              { attr: "borrowed on", val: "23/12/2021" },
              { attr: "given by", val: "James P. Sullivan" },
              { attr: "return by", val: "24/12/2021" },
              { attr: "items borrowed", val: "10" },
            ]}
          />
        </div>

        <div className="return-items-container">
          <div className="item-return-text">Select items to return</div>
          <div className="return-items-subcontainer">
            <Input type="number" maxWidth="3.5rem" />
            <CustomButton
              type="primary"
              text="return items"
              fontSize="16px"
            ></CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MSProfile;
