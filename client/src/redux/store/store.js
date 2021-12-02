import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice/authSlice';
import profileReducer from '../features/employees/profileSlice';
import employeesReducer from '../features/employees/employeesSlice';
import borrowingsReducer from '../features/borrowings/borrowingsSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		profile: profileReducer,
		employees: employeesReducer,
		borrowings: borrowingsReducer,
	},
});
