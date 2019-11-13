import { createReducer, createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    getScheduleRequest: [],
    getScheduleSuccess: ['classes'],
    getDataFromExcelRequest:[],
    getDataFromExcelSuccess:[],
    createScheduleRequest: [],
    createScheduleSuccess:[],
    sideEffectScheduleFail: ['error']
})

export const ScheduleTypes = Types
export default Creators


export const INITIAL_STATE = {
    data : {
        classes: {},
    },
    processing: false,
    error: {}
}

export const request = state => {
    return { ...state, processing: true} 
}

export const getScheduleSuccess = (state, {classes}) => {
    return { ...state, processing: false, data:{
        classes : classes
    }}
}

export const getDataFromExcelSuccess = (state) => {
    return {...state, processing:false}
}

export const createScheduleSuccess = (state) => {
    return {...state, processing:false}
}

export const fail = (state, {error}) => {
    return { ...state, processing: false, error:error}
}

export const reducer = createReducer( INITIAL_STATE ,{
    [ScheduleTypes.GET_SCHEDULE_REQUEST]: request,
    [ScheduleTypes.GET_DATA_FROM_EXCEL_REQUEST]: request,
    [ScheduleTypes.CREATE_SCHEDULE_REQUEST]: request,
    [ScheduleTypes.GET_SCHEDULE_SUCCESS] : getScheduleSuccess,
    [ScheduleTypes.GET_DATA_FROM_EXCEL_SUCCESS]: getDataFromExcelSuccess,
    [ScheduleTypes.CREATE_SCHEDULE_SUCCESS]: createScheduleSuccess,
    [ScheduleTypes.SIDE_EFFECT_SCHEDULE_FAIL] : fail
})