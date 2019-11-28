// import { createReducer, createActions } from 'reduxsauce'

// const { Types, Creators } = createActions({
//     getScheduleRequest: [],
//     getScheduleSuccess: ['classes'],
//     sideEffectScheduleFail: ['error']
// })

// export const UserTypes = Types
// export default Creators

// export const INITIAL_STATE = {
//     data : {
//         user: {},
//     },
//     processing: false,
//     error: {}
// }

// export const request = state => {
//     return { ...state, processing: true} 
// }

// export const getScheduleSuccess = (state, {classes}) => {       //nen viet tach cai data ra. rut kinh nghiem lan sau
//     return { ...state, processing: false, data:{
//         classes : classes,
//         eventByNow : state.data.eventByNow
//     }}
// }

// export const getDataFromExcelSuccess = (state) => {
//     return {...state, processing:false}
// }

// export const createScheduleSuccess = (state) => {
//     return {...state, processing:false}
// }

// export const getEventByNowSuccess = (state, {events}) => {
//     return {...state,processing:false,data:{
//         eventByNow : events
//     }}
// }

// export const fail = (state, {error}) => {
//     return { ...state, processing: false, error:error}
// }

// export const reducer = createReducer( INITIAL_STATE ,{
//     [ScheduleTypes.GET_SCHEDULE_REQUEST]: request,
//     [ScheduleTypes.GET_DATA_FROM_EXCEL_REQUEST]: request,
//     [ScheduleTypes.CREATE_SCHEDULE_REQUEST]: request,
//     [ScheduleTypes.GET_EVENT_BY_NOW_REQUEST]: request,
//     [ScheduleTypes.GET_SCHEDULE_SUCCESS] : getScheduleSuccess,
//     [ScheduleTypes.GET_DATA_FROM_EXCEL_SUCCESS]: getDataFromExcelSuccess,
//     [ScheduleTypes.CREATE_SCHEDULE_SUCCESS]: createScheduleSuccess,
//     [ScheduleTypes.GET_EVENT_BY_NOW_SUCCESS]: getEventByNowSuccess,
//     [ScheduleTypes.SIDE_EFFECT_SCHEDULE_FAIL] : fail
// })