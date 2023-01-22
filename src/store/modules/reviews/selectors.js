export const selectReviewModule = (state) => state.review;

export const selectReviewsByIds = (state, ids) => {
    return ids.map(id => selectReviewById(state, id))
}

export const selectReviewById = (state, id) => {
    return state.review.entities[id]
}