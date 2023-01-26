import { selectRestaurantIds } from '../selectors';
import { normalizer } from '../../../utils/normalizer';
import { restaurantActions } from '..';

export const loadRestaurantsIfNotExist = (dispatch, getState) => {
  const state = getState();

  if (selectRestaurantIds(state)?.length) {
    return;
  }

  dispatch(restaurantActions.startLoading());
  fetch('http://localhost:3001/api/restaurants/')
    .then((response) => response.json())
    .then((restaurants) => {
      dispatch(restaurantActions.finishLoading(normalizer(restaurants)));
    })
    .catch(() => {
      dispatch(restaurantActions.failLoading());
    });
};
