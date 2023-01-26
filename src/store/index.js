import { combineReducers } from 'redux';
import { cartReducer } from './modules/cart';
import { restaurantSlice } from './modules/restaurant';
import { loadRestaurantsIfNotExist } from './modules/restaurant/middleware/loadRestaurantsIfNotExist';
import { loadDishByRestaurantIdIfNotExist } from './modules/dish/middleware/loadDishByRestaurantIdIfNotExist';
import { loadUsersIfNotExist } from './modules/user/middleware/loadUsersIfNotExist';
import { reviewReducer } from './modules/review';
import { userReducer } from './modules/user';
import { logger } from './middleware/logger';
import { loadReviewByRestaurantIdIfNotExist } from './modules/review/middleware/loadReviewsByRestaurantIdIfNotExist';
import { configureStore } from '@reduxjs/toolkit';
import { dishSlice } from './modules/dish';

const rootReducer = combineReducers({
  cart: cartReducer,
  restaurant: restaurantSlice.reducer,
  dish: dishSlice.reducer,
  review: reviewReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [
    logger,
    loadRestaurantsIfNotExist,
    loadDishByRestaurantIdIfNotExist,
    loadUsersIfNotExist,
    loadReviewByRestaurantIdIfNotExist,
  ],
});

// export const store = createStore(
//   rootReducer,
//   applyMiddleware(
//     logger,
//     loadRestaurantsIfNotExist,
//     loadDishByRestaurantIdIfNotExist,
//     loadUsersIfNotExist,
//     loadReviewByRestaurantIdIfNotExist
//   )
// );
