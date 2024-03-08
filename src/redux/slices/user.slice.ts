import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store/store';

const initialState = {
  users: [],
  loading: false,
  error: null,
  favorites: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsersRequest: state => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state: any, action: any) => {
      state.loading = false;
      state.users = action.payload.map((user: any) => ({
        ...user,
        favorite: state.favorites.includes(user.id),
      }));
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleFavorite: (state: any, action: any) => {
      const userId = action.payload;
      const index = state.favorites.indexOf(userId);
      state.favorites.push(userId);

      state.users = state.users.map((user: any) => ({
        ...user,
        favorite: state.favorites.includes(user.id),
      }));
    },
    removeFromFavorites: (state: any, action: any) => {
      const userId = action.payload;
      const index = state.favorites.indexOf(userId);

      state.favorites.splice(index, 1);

      state.users = state.users.map((user: any) => ({
        ...user,
        favorite: state.favorites.includes(user.id),
      }));
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  toggleFavorite,
  removeFromFavorites,
} = userSlice.actions;

export const selectUsers = (state: RootState) => state.user.users;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;
export const selectFavorites = (state: RootState) => state.user.favorites;

export default userSlice.reducer;
