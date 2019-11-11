
import { combineReducers } from 'redux'
import { reducer as modal } from 'redux-modal'

const rootReducer = combineReducers({
  modal,
  schedule: require('./_schedule-redux').reducer
})

export default rootReducer