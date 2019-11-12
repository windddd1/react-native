import { takeLatest, all } from 'redux-saga/effects'
/* ------------- Types ------------- */
import { ScheduleTypes } from '../redux/_schedule-redux'
/* ------------- Sagas ------------- */
import ScheduleSagas from './_schedule-sagas'


export default function* root() {
    yield all([
        takeLatest(ScheduleTypes.GET_SCHEDULE_REQUEST, ScheduleSagas.getDataFromExcel), //TODO: run side effects(wachter)
    ])
}