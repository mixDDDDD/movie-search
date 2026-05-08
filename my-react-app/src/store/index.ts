import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import userReducer from './slices/userSlice';
import { favoritesListener } from './listeners/favoritesListener';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(favoritesListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;