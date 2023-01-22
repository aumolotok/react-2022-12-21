import { Menu } from '../Menu/Menu';
import { Reviews } from '../Reviews/Reviews';
import { useMemo, useState } from 'react';
import { NewReviewForm } from '../NewReviewForm/NewReviewForm';
import { Rating } from '../Rating/Rating';
import { Size } from '../../constants/ui';
import { useSelector } from 'react-redux';
import { selectRestaurantById, selectRestaurantIds } from '../../store/modules/restaurant/selectors';
import { selectReviewsByIds } from '../../store/modules/reviews/selectors';

export const Restaurant = ({ restaurantId }) => {
  const restaurant = useSelector((state) =>
    selectRestaurantById(state, { restaurantId })
  );

  const reviews = useSelector((state) => 
    selectReviewsByIds(state, restaurant.reviews)
  )

  // const rating = useMemo(
  //   () =>
  //     Math.round(
  //       reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  //     ),
  //   [reviews]
  // );

  if (!restaurant) {
    return null;
  }

  return (
    <div>
      <h1>{restaurant.name}</h1>
      {/*<Rating value={rating} size={Size.l} />*/}
      <Menu restaurantId={restaurantId} />
      <Reviews reviews={reviews}/>
    </div>
  );
};
