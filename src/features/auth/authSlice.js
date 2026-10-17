
import { createSlice } from '@reduxjs/toolkit';

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

const initialState = {
  user: readStorage('user', null),
  users: readStorage('eventhub_users', []),
  isAuthenticated: Boolean(readStorage('user', null)),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    registerUser: (state, action) => {
      const account = action.payload;

      state.users.push(account);
      localStorage.setItem(
        'eventhub_users',
        JSON.stringify(state.users)
      );
    },

    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem(
        'user',
        JSON.stringify(action.payload)
      );
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem('user');
    },
  },
});

export const { registerUser, login, logout } = authSlice.actions;

export default authSlice.reducer;
