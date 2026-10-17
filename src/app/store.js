import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import registrationsReducer from '../features/events/registrationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registrations: registrationsReducer,
  },
});
