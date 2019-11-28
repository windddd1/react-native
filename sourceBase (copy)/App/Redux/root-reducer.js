
import { combineReducers } from 'redux'
import { reducer as modal } from 'redux-modal'

const rootReducer = combineReducers({
  modal,
  user: require('./_user-redux').reducer,
})

export default rootReducer
