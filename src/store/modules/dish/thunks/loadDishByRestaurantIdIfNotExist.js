import { dishActions } from '..';
import { normalizer } from '../../../utils/normalizer';
import { selectRestaurantMenuById } from '../../restaurant/selectors';
import { selectDishIds } from '../selectors';

export const loadDishByRestaurantIdIfNotExist =
  (restaurantId) => (dispatch, getState) => {
    const state = getState();
    const restaurantDishIds = selectRestaurantMenuById(state, { restaurantId });
    const loadedDishIds = selectDishIds(state);

    if (
      restaurantDishIds.every((restaurantDishId) =>
        loadedDishIds.includes(restaurantDishId)
      )
    ) {
      return;
    }

    dispatch(dishActions.startLoading());
    fetch(`http://localhost:3001/api/products?restaurantId=${restaurantId}`)
      .then((response) => response.json())
      .then((dishes) => {
        dispatch(dishActions.finishLoading(normalizer(dishes)));
      })
      .catch(() => dispatch(dishActions.failLoading()));
  };
