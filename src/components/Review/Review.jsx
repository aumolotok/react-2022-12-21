import styles from './styles.module.css';
import { Rating } from '../Rating/Rating';
import { Size } from '../../constants/ui';
import { User } from '../User/user';

export const Review = ({ review }) => {
  return (
    <div className={styles.root}>
      <User userId={review.userId}/>
      <div>{review.text}</div>
      <Rating value={review.rating} size={Size.s} />
    </div>
  );
};
