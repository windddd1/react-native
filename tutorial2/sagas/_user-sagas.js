import { put, call } from 'redux-saga/effects'
import UserActions from '../redux/_user-redux'
import axios from 'axios'

const UserSagas = {
    *getAllUser() {
        try{
            const userList = yield axios.get('http://jsonplaceholder.typicode.com/posts')
            yield put(UserActions.getUserSuccess(userList.data))
        } catch (err) {
            console.log(err)
            yield put(UserActions.getUserFailure(err))
        }
    }
}

export default UserSagas