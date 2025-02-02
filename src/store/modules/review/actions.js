export const REVIEW_ACTIONS = {
  load: 'review/Load',
  startLoading: 'review/StartLoading',
  finishLoading: 'review/FinishLoading',
  failLoading: 'review/FailLoading',
};

export const loadReviews = (restaurantId) => ({
  type: REVIEW_ACTIONS.load,
  payload: restaurantId,
});

export const startLoadingReviews = () => ({
  type: REVIEW_ACTIONS.startLoading,
});
export const finishLoadingReviews = (reviews) => ({
  type: REVIEW_ACTIONS.finishLoading,
  payload: reviews,
});
export const failLoadingReviews = () => ({
  type: REVIEW_ACTIONS.failLoading,
});
