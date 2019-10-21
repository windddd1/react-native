import { createReducer, createActions } from 'reduxsauce'

// TODO:Declare Action and type
const { Types, Creators } = createActions({
    getUserRequest: [],
    getUserSuccess: ['users'],  // TODO:define params to getUserSuccess
    deleteUserRequest:['id'],
    deleteUserSuccess:[],
    postUserRequest:['user'],
    postUserSuccess: [],
    editUserRequest: ['id'],
    editUserSuccess: [],
    sideEffectFailure : ['error'],
})

export const UserTypes = Types
export default Creators

//TODO: Declare initial state
export const INITIAL_STATE = {
    processing : false,
    data : {
        userDetail: {},
        userList: []
    },
    error: {}
}

// TODO:Declare Reducers
export const request = state => {
    return { ...state, processing: true} 
}

export const getAllSuccess = (state, {users}) => {
    return { ...state, processing: false, data:{
        userList : users
    }}
}

export const deleteSuccess = (state) => {
    return {...state, processing: false}
}

export const postSuccess = (state) => {
    return {...state, processing: false}
}

export const failure = (state, {error}) => {
    return { ...state, processing: false, error:error}
}

 //TODO:Hookup Reducers To Types in Action
export const reducer = createReducer( INITIAL_STATE ,{
    [UserTypes.GET_USER_REQUEST]: request,
    [UserTypes.GET_USER_SUCCESS]: getAllSuccess,
    [UserTypes.DELETE_USER_REQUEST]: request,
    [UserTypes.DELETE_USER_SUCCESS]: deleteSuccess,
    [UserTypes.POST_USER_REQUEST] : request,
    [UserTypes.POST_USER_SUCCESS] : postSuccess,
    [UserTypes.SIDE_EFFECT_FAILURE]: failure,

})