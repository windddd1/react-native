import { takeLatest, all } from 'redux-saga/effects'
/* ------------- Types ------------- */
import { UserTypes } from '../redux/_user-redux'
/* ------------- Sagas ------------- */
import UserSagas from './_user-sagas'


export default function* root() {
  yield all([
    takeLatest(UserTypes.GET_USER_REQUEST, UserSagas.getAllUser), //TODO: run side effects(wachter)
    takeLatest(UserTypes.DELETE_USER_REQUEST, UserSagas.deleteUser),
    takeLatest(UserTypes.POST_USER_REQUEST, UserSagas.postUser),
  ])
}
