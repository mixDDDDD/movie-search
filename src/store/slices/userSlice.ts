import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  name: string | null;
};

const LS_KEY = 'currentUser';

function loadFromStorage(): UserState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed.name === 'string') {
        return { name: parsed.name };
      }
    }
  } catch {}
  return { name: null };
}

const initialState: UserState = loadFromStorage();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.name = action.payload;
      localStorage.setItem(LS_KEY, JSON.stringify({ name: action.payload }));
    },
    logout(state) {
      state.name = null;
      localStorage.removeItem(LS_KEY);
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;