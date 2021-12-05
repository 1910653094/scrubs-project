import { useLocation, useNavigate } from "react-router-dom";
import MSPageWrapper from "../../../layouts/MSPageWrapper/MSPageWrapper";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/Arrow-Left.svg";
import { CustomButton, Select, TextArea } from "../../../components";
import './MSReport.scss';

const MSReport = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const borrowing = location.state;
    console.log(borrowing);

    return (
        <MSPageWrapper>
            <div className='ms-report'>
                <div className='container'>
                    <div className='heading'>
                        <div className='arrow-left' onClick={() => navigate(-1)}>
                            <ArrowLeft />
                        </div>
                        <h2>Report {borrowing.type}</h2>
                    </div>

                    <div className='detailed-info'>
                        <Select
                            title='Type of report'
                            type='report_type'
                        />

                        <TextArea title='Description' type='text'/>
                    </div>

                    <div className='return'>
                        <div>
                            <CustomButton textColor='rgb(175, 68, 63)' type='tertiary' text='CANCEL' />
                            <CustomButton type='primary' text='Return' fontSize='16px' />
                        </div>
                    </div>
                </div>
            </div>
        </MSPageWrapper>
    );
};

export default MSReport;
