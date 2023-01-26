import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LOADING_STATUSES } from '../../constants/loadingStatuses';
import { normalizer } from '../../utils/normalizer';
import { selectRestaurantIds } from './selectors';

export const fetchRestaurants = createAsyncThunk(
  `restaurants/fetchRestaurants`,
  async (_, { getState, rejectWithValue }) => {
    console.log('fetchRestaurants');
    const state = getState();

    if (selectRestaurantIds(state)?.length) {
      return rejectWithValue(LOADING_STATUSES.earlyAdded);
    }

    const response = await fetch('http://localhost:3001/api/restaurants/');

    return normalizer(await response.json());
  }
);

const initialState = {
  entities: {},
  ids: [],
  loadingStatus: LOADING_STATUSES.idle,
};

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loadingStatus = LOADING_STATUSES.loading;
      })
      .addCase(
        fetchRestaurants.fulfilled,
        (state, { payload: { entities, ids } }) => {
          state.entities = entities;
          state.ids = ids;
          state.loadingStatus = LOADING_STATUSES.success;
        }
      )
      .addCase(fetchRestaurants.rejected, (state, { payload }) => {
        state.loadingStatus =
          payload === LOADING_STATUSES.earlyAdded
            ? LOADING_STATUSES.success
            : LOADING_STATUSES.failed;
      }),
});
