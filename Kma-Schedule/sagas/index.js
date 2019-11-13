import { takeLatest, all } from 'redux-saga/effects'
/* ------------- Types ------------- */
import { ScheduleTypes } from '../redux/_schedule-redux'
/* ------------- Sagas ------------- */
import ScheduleSagas from './_schedule-sagas'


export default function* root() {
    yield all([
        takeLatest(ScheduleTypes.CREATE_SCHEDULE_REQUEST, ScheduleSagas.createSchedule), 
        takeLatest(ScheduleTypes.GET_DATA_FROM_EXCEL_REQUEST, ScheduleSagas.getDataFromExcel),
        takeLatest(ScheduleTypes.GET_SCHEDULE_REQUEST, ScheduleSagas.getSchedule),  //TODO: run side effects(wachter)
    ])
}