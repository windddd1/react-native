import { createSelector } from 'reselect'

const selectHome = state => state.schedule

const makeSelectClasses = createSelector(
    selectHome,
    homeState => homeState.data.classes
    )

const makeSelectClassByNow = createSelector(
    selectHome,
    homeState => homeState.data.eventByNow
    )

export {
    makeSelectClasses,
    makeSelectClassByNow
}