import MSPageWrapper from '../../../layouts/MSPageWrapper/MSPageWrapper';
import { useLocation, useNavigate } from 'react-router';
import {
	Status,
	CustomButton,
	DetailedInformation,
	Input,
} from '../../../components';
import { ReactComponent as ArrowLeft } from '../../../assets/icons/Arrow-Left.svg';
import { ReactComponent as Report } from '../../../assets/icons/Report.svg';
import './MSBorrowingDetails.scss';

const MSBorrowingDetails = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { borrowing } = location.state;
	return (
		<MSPageWrapper>
			<div className='ms-your-borrowings'>
				<div className='container'>
					<div className='heading'>
						<div className='arrow-left' onClick={() => navigate(-1)}>
							<ArrowLeft />
						</div>
						<h2>{borrowing.type}</h2>
						<CustomButton
							text={
								<div className='report-button'>
									<Report />
									Report item
								</div>
							}
							type='tertiary'
							fontSize='14px'
							letterSpacing='0.01em'
							onClick={() => navigate('report', { state: borrowing })}
						/>
					</div>
					<Status type={borrowing.status} />
					<div className='detailed-info'>
						<DetailedInformation
							title='Item Information'
							items={[
								{ attr: 'type', val: borrowing.type },
								{ attr: 'color', val: borrowing.color },
								{ attr: 'Gender', val: borrowing.gender },
								{ attr: 'size', val: borrowing.size },
							]}
						/>
						<DetailedInformation
							title='Borrowing Information'
							items={[
								{ attr: 'borrowed on', val: borrowing.borrowDate },
								{ attr: 'given by', val: borrowing.givenBy },
								{ attr: 'return by', val: borrowing.returnBy },
								{ attr: 'items borrowed', val: borrowing.amount },
							]}
						/>
					</div>
					<div className='return'>
						<span>Select items to return</span>
						<div>
							<Input type='number' maxWidth='3.5rem' />
							<CustomButton type='primary' text='Return' fontSize='16px' />
						</div>
					</div>
				</div>
			</div>
		</MSPageWrapper>
	);
};

export default MSBorrowingDetails;
