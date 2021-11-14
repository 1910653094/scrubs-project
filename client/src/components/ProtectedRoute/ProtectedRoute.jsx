import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ permission }) => {
	const { isAuthed, role } = useSelector(({ auth }) => auth);

	if (!isAuthed) return <Navigate to='/' />;
	if (role !== permission) return <Navigate to='/denied' />;
	return <Outlet />;
};
export default ProtectedRoute;
