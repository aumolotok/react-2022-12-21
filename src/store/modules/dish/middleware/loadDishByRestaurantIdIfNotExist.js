import { dishActions } from '..';
import { normalizer } from '../../../utils/normalizer';
import { selectRestaurantMenuById } from '../../restaurant/selectors';
import { selectDishIds } from '../selectors';

export const loadDishByRestaurantIdIfNotExist =
  (store) => (next) => (action) => {
    if (action?.type !== dishActions.load.type) {
      return next(action);
    }

    const restaurantId = action.payload;
    const state = store.getState();
    const restaurantDishIds = selectRestaurantMenuById(state, { restaurantId });
    const loadedDishIds = selectDishIds(state);

    if (
      restaurantDishIds.every((restaurantDishId) =>
        loadedDishIds.includes(restaurantDishId)
      )
    ) {
      return;
    }

    store.dispatch(dishActions.startLoading());
    fetch(`http://localhost:3001/api/products?restaurantId=${restaurantId}`)
      .then((response) => response.json())
      .then((dishes) => {
        store.dispatch(dishActions.finishLoading(normalizer(dishes)));
      })
      .catch(() => store.dispatch(dishActions.failLoading()));
  };
