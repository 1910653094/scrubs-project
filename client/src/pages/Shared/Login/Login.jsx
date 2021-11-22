import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const Login = () => {
	const { isAuthed, role } = useSelector(({ auth }) => auth);
	if (isAuthed)
		return role === 'housekeeper' ? (
			<Navigate to='/h/dashboard' />
		) : (
			<Navigate to='/m/dashboard' />
		);

	return <div>Login Page</div>;
};
export default Login;
