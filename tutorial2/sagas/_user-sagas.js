import { put, call } from 'redux-saga/effects'
import UserActions from '../redux/_user-redux'
import axios from 'axios'

const httpClient = axios.create();
httpClient.defaults.timeout = 3000;

const UserSagas = {
    *getAllUser() {
        try {
            const userList = yield call(getUser)
            yield put(UserActions.getUserSuccess(userList.data))
        } catch (err) {
            console.log(err)
            yield put(UserActions.getUserFailure(err))
        }
    },
    *deleteUser() {
        try {
            const response = yield call(deleteUser)
            console.log(response)
            yield put(UserActions.deleteUserSuccess())
        } catch (err) {
            console.log(err)
            yield put(UserActions.getUserFailure(err))
        }
    }
}

function getUser() {
    return httpClient.get("https://jsonplaceholder.typicode.com/posts")
}

function deleteUser() {
    httpClient.defaults.timeout = 3000;
    return httpClient.delete("https://jsonplaceholder.typicode.com/posts/1")
}

export default UserSagas