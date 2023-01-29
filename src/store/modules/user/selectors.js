export const selectUsersModule = (state) => state.user

export const selectUserById = (state, userId) => {
    return selectUsersModule(state).entities[userId]
}