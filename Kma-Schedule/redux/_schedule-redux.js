import { createReducer, createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    getScheduleRequest: [],
    getScheduleSucces: ['classes'],
    getScheduleFail: ['error']
})

export const ScheduleTypes = Types
export default Creators


export const INITIAL_STATE = {
    data : {
        classes: {},
    },
    processing:false,
    error: {}
}

export const request = state => {
    return { ...state, processing: true} 
}

export const getScheduleSucces = (state, {classes}) => {
    return { ...state, processing: false, data:{
        classes : classes
    }}
}

export const fail = (state, {error}) => {
    return { ...state, processing: false, error:error}
}

export const reducer = createReducer( INITIAL_STATE ,{
    [ScheduleTypes.GET_SCHEDULE_REQUEST]: request,
    [ScheduleTypes.GET_SCHEDULE_SUCCESS] : getScheduleSucces,
    [ScheduleTypes.GET_SCHEDULE_FAIL] : getScheduleFail
})