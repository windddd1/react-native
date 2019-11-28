import { createSelector } from 'reselect'

const selectHome = state => state.user

const makeSelectUser = createSelector(
  selectHome,
  homeState => homeState.processing
)

export {
  makeSelectUser,
}
