
import { createSlice } from '@reduxjs/toolkit';

function readRegistrations() {
  try {
    const saved = localStorage.getItem('eventhub_registrations');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: readRegistrations(),
  reducers: {
    registerEvent: (state, action) => {
      const { userEmail, event } = action.payload;

      if (!userEmail || !event?.id) return;

      const alreadyRegistered = state.some(
        (registration) =>
          registration.userEmail === userEmail &&
          registration.event.id === event.id
      );

      if (!alreadyRegistered) {
        state.push({
          userEmail,
          event,
          registeredAt: new Date().toISOString(),
        });

        localStorage.setItem(
          'eventhub_registrations',
          JSON.stringify(state)
        );
      }
    },

    cancelRegistration: (state, action) => {
      const { userEmail, eventId } = action.payload;

      const remaining = state.filter(
        (registration) =>
          !(
            registration.userEmail === userEmail &&
            registration.event.id === eventId
          )
      );

      localStorage.setItem(
        'eventhub_registrations',
        JSON.stringify(remaining)
      );

      return remaining;
    },
  },
});

export const { registerEvent, cancelRegistration } =
  registrationsSlice.actions;

export default registrationsSlice.reducer;
