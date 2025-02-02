import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { LOADING_STATUSES } from '../../constants/loadingStatuses';
import { fetchRestaurants } from './thunk/fetchRestaurants';

const restaurantEntityAdapter = createEntityAdapter();

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: restaurantEntityAdapter.getInitialState({
    loadingStatus: LOADING_STATUSES.idle,
  }),
  extraReducers: (builder) =>
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loadingStatus = LOADING_STATUSES.loading;
      })
      .addCase(fetchRestaurants.fulfilled, (state, { payload }) => {
        restaurantEntityAdapter.addMany(state, payload);
        state.loadingStatus = LOADING_STATUSES.success;
      })
      .addCase(fetchRestaurants.rejected, (state, { payload }) => {
        state.loadingStatus =
          payload === LOADING_STATUSES.earlyAdded
            ? LOADING_STATUSES.success
            : LOADING_STATUSES.failed;
      }),
});
