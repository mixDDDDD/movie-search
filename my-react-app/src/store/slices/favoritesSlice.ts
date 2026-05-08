import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieModel } from '../../types/models';

type FavoritesState = {
  items: MovieModel[];
};

const initialState: FavoritesState = {
  items: [],
};

export const getFavoritesKey = (userName: string) =>
  `favorites_${userName}`;

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<MovieModel[]>) {
      state.items = action.payload;
    },
    addFavorite(state, action: PayloadAction<MovieModel>) {
      state.items.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<string | number>) {
      state.items = state.items.filter(
        (m) => m.id !== String(action.payload)
      );
    },
    clearFavorites(state) {
      state.items = [];
    },
  },
});

export const {
  setFavorites,
  addFavorite,
  removeFavorite,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;