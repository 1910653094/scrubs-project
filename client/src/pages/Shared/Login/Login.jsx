import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import doctorImg from '../../../assets/images/doctors-5.jpg';
import { CustomButton } from '../../../components';
import Input from '../../../components/Input/Input';
import { setAuth } from '../../../redux/features/authSlice/authSlice';
import './Login.scss';

const Login = () => {
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	const dispatch = useDispatch();

	const { isAuthed, role } = useSelector(({ auth }) => auth);
	if (isAuthed)
		return role === 'housekeeper' ? (
			<Navigate to='/h/dashboard' />
		) : (
			<Navigate to='/m/dashboard' />
		);

	return (
		<div className='login-wrapper'>
			<img src={doctorImg} alt='Doctors' />
			<div className='logo'>
				<div>
					Scrubs.io
					<span>know your scrubs</span>
				</div>
			</div>
			<div className='login-card'>
				Please login to access the page
				<Input
					title='Email'
					type='email'
					value={emailInput || ''}
					placeholder='Enter your email'
					onChange={(e) => setEmailInput(e.target.value)}
				/>
				<Input
					title='Password'
					type='password'
					value={passwordInput || ''}
					placeholder='Enter your password'
					onChange={(e) => setPasswordInput(e.target.value)}
				/>
				<div className='actions'>
					<CustomButton
						type='primary'
						text='Login MSM'
						onClick={() => dispatch(setAuth({ auth: true, role: 'medical' }))}
					/>
					<CustomButton
						type='primary'
						text='Login HSM'
						onClick={() =>
							dispatch(setAuth({ auth: true, role: 'housekeeper' }))
						}
					/>
				</div>
			</div>
		</div>
	);
};
export default Login;
