import { createSelector } from 'reselect'

const selectGlobal = state => state.user

const makeSelectUserList = createSelector(
  selectGlobal,
  globalState => globalState.data.userList
)

export {
  makeSelectUserList,
}