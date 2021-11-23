import { ReactComponent as BurgerIcon } from "../../../assets/icons/Burgericon.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/Arrow-Left.svg";
import { ReactComponent as Report } from "../../../assets/icons/Report.svg";
import { CustomButton } from "../../../components";
import { DetailedInformation } from "../../../components";
import { Status } from "../../../components";
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
        <DetailedInformation
          title="General Information Scrubs"
          type="Doctor"
          color="Green"
          gender="Male"
          size="L"
        ></DetailedInformation>
        <DetailedInformation
          title="Borrowing Information"
          borrowed_on="23/12/2021"
          given_by="James P. Sullivan"
          returned_by="24/12/2021"
          items_borrowed="10"
        ></DetailedInformation>
        <div className="spacer"></div>
        <div className="return-items-container">
          <div className="item-return-text">Select items to return</div>
          <div className="return-items-subcontainer"></div>
        </div>
      </div>
    </div>
  );
};
export default MSProfile;
