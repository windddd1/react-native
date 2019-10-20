import { createReducer, createActions } from 'reduxsauce'

// TODO:Declare Action and type
const { Types, Creators } = createActions({
    getUserRequest: [],
    getUserSuccess: ['users'],  // define params to getUserSuccess
    getUserFailure : ['error']
})

export const UserTypes = Types
export default Creators     // export action

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

export const success = (state, {users}) => {
    return { ...state, processing: false, data:{
        userList : users
    }}
}
// export const success = (state, action) => {
//     const {users, type} = action
//     console.log(action)
//     console.log(type)
//     console.log(users)
//     return { ...state, processing: false, data:{
//         userList : users
//     }}
// }

export const failure = (state, {error}) => {
    return { ...state, processing: true, error:error}
}

 //TODO:Hookup Reducers To Types in Action
export const reducer = createReducer( INITIAL_STATE ,{
    [UserTypes.GET_USER_REQUEST]: request,
    [UserTypes.GET_USER_SUCCESS]: success,
    [UserTypes.GET_USER_FAILURE]: failure
})