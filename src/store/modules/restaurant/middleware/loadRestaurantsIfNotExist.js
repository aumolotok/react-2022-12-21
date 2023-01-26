import { selectRestaurantIds } from '../selectors';
import { normalizer } from '../../../utils/normalizer';
import { restaurantActions } from '..';

export const loadRestaurantsIfNotExist = (store) => (next) => (action) => {
  if (action?.type !== restaurantActions.load.type) {
    return next(action);
  }

  const state = store.getState();

  if (selectRestaurantIds(state)?.length) {
    return;
  }

  store.dispatch(restaurantActions.startLoading());
  fetch('http://localhost:3001/api/restaurants/')
    .then((response) => response.json())
    .then((restaurants) => {
      store.dispatch(restaurantActions.finishLoading(normalizer(restaurants)));
    })
    .catch(() => {
      store.dispatch(restaurantActions.failLoading());
    });
};
