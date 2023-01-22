import { normalizedReviews } from '../../../constants/normalized-fixtures';


const defaultState = {
    entities: normalizedReviews.reduce((result, review) => {
        result[review.id] = review;

        return result;
    },{}),
    ids: normalizedReviews.map(({id}) => id),
};

export const reviewsReducer = (state = defaultState, action) => {
    console.log(state)
    return state;
}