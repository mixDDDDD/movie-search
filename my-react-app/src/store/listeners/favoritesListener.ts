import { createListenerMiddleware } from '@reduxjs/toolkit';
import { addFavorite, removeFavorite, clearFavorites, getFavoritesKey } from '../slices/favoritesSlice';
import { RootState } from '../index';

export const favoritesListener = createListenerMiddleware();

favoritesListener.startListening({
  matcher: (action) =>
    addFavorite.match(action) || removeFavorite.match(action) || clearFavorites.match(action),

  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;

    const userName = state.user.name;
    if (!userName) return;

    const key = getFavoritesKey(userName);
    const favorites = state.favorites.items;

    localStorage.setItem(key, JSON.stringify(favorites));
  },
});