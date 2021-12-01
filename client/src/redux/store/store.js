import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice/authSlice';
import profileReducer from '../features/profileSlice/profileSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		profile: profileReducer,
	},
});
