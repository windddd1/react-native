import { put, call } from 'redux-saga/effects'
import UserActions from '../redux/_user-redux'
import axios from 'axios'

const httpClient = axios.create();
httpClient.defaults.timeout = 3000;

const UserSagas = {
    *getAllUser() {
        try {
            const userList = yield call(apiGetUser)
            yield put(UserActions.getUserSuccess(userList.data))
        } catch (err) {
            console.log(err)
            yield put(UserActions.sideEffectFailure(err))
        }
    },
    *deleteUser() {
        try {
            const response = yield call(apiDeleteUser)
            console.log(response)
            yield put(UserActions.deleteUserSuccess())
        } catch (err) {
            console.log(err)
            yield put(UserActions.sideEffectFailure(err))
        }
    },
    *postUser(action) {
        try {
            const { user } = action
            const response = yield call(apiPostUser,user)
            console.log(response)
            yield put(UserActions.postUserSuccess())
        } catch (err) {
            console.log(err)
            yield put(UserActions.sideEffectFailure(err))
        }
    }
}

function apiGetUser() {
    return httpClient.get("https://jsonplaceholder.typicode.com/posts")
}

function apiDeleteUser() {
    return httpClient.delete("https://jsonplaceholder.typicode.com/posts/1")
}

function apiPostUser(user) {
    return httpClient.post("https://jsonplaceholder.typicode.com/posts",user)
}
export default UserSagas