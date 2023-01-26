import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LOADING_STATUSES } from '../../constants/loadingStatuses';
import { normalizer } from '../../utils/normalizer';
import { selectRestaurantMenuById } from '../restaurant/selectors';
import { selectDishIds } from './selectors';

export const fetchDishByRestaurantId = createAsyncThunk(
  'dish/fetchDishByRestaurantId',
  async (restaurantId, { getState, rejectWithValue }) => {
    const state = getState();
    const restaurantDishIds = selectRestaurantMenuById(state, { restaurantId });
    const loadedDishIds = selectDishIds(state);

    if (
      restaurantDishIds.every((restaurantDishId) =>
        loadedDishIds.includes(restaurantDishId)
      )
    ) {
      return rejectWithValue(LOADING_STATUSES.earlyAdded);
    }

    const response = await fetch(
      `http://localhost:3001/api/products?restaurantId=${restaurantId}`
    );

    return normalizer(await response.json());
  }
);

const initialState = {
  entities: {},
  ids: [],
  loadingStatus: LOADING_STATUSES.idle,
};

export const dishSlice = createSlice({
  name: 'dish',
  initialState,
  extraReducers: (build) =>
    build
      .addCase(fetchDishByRestaurantId.pending, (state) => {
        state.loadingStatus = LOADING_STATUSES.loading;
      })
      .addCase(
        fetchDishByRestaurantId.fulfilled,
        (state, { payload: { entities, ids } }) => {
          state.entities = {
            ...state.entities,
            ...entities,
          };
          state.ids = Array.from(new Set([...state.ids, ...ids]));
          state.loadingStatus = LOADING_STATUSES.success;
        }
      )
      .addCase(fetchDishByRestaurantId.rejected, (state, { payload }) => {
        state.loadingStatus =
          payload === LOADING_STATUSES.earlyAdded
            ? LOADING_STATUSES.success
            : LOADING_STATUSES.failed;
      }),
});
