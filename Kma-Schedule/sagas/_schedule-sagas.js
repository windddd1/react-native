import { put, call } from 'redux-saga/effects'
import ScheduleActions from '../redux/_schedule-redux'
import XLSX from 'xlsx'
import { createSchedule, queryDays, insertEvent } from '../databases/allSchemas'


import { readFile,ExternalDirectoryPath } from 'react-native-fs'
const DDP = ExternalDirectoryPath + "/"
const input = res => res


const ScheduleSagas = {
    *getSchedule() {
        try{
            const res = yield call(getDataToRealm)
            yield put(ScheduleActions.getScheduleSuccess(res))
        } catch(err) {
            console.log(err)
            yield put(ScheduleActions.sideEffectScheduleFail(err))
        }
    },
    *createSchedule() {
        try {
            const res = yield call(createDaysEmpty)
            yield put(ScheduleActions.createScheduleSuccess())
        } catch(err) {
            console.log(err)
            yield put(ScheduleActions.sideEffectScheduleFail(err))
        }
    },
    *getDataFromExcel() {
        try {
            const res = yield call(importFile)
            yield put(ScheduleActions.getDataFromExcelSuccess())
        } catch (err) {
            console.log(err)
            yield put(ScheduleActions.sideEffectScheduleFail(err))
        }
    },
    
}

async function importFile() {
    try {
        let res = await readFile(DDP + "schedule.xls", 'ascii')
        const wb = XLSX.read(input(res), {type:'binary'});
            /* convert first worksheet to AOA */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, {header:1})
            let collection = []
            data.forEach((item) => {
                if(['2','3','4','5','6','7'].includes(item[0])) {
                    let flagTime = item[8].split(',')[0]
                    if(flagTime == 1) {
                        item[8] = '07:00 AM'
                    } else if(flagTime == 4) {
                        item[8] = '09:30 AM'
                    } else if(flagTime == 7) {
                        item[8] = '12:30 PM'
                    } else if(flagTime == 10) {
                        item[8] = '15:00 PM'
                    } else if(flagTime == 13) {
                        item[8] = '18:00 PM'
                    } else if(flagTime == 9) {
                        item[8] = '14:15 PM'
                    }
                    collection.push(item)
                }
            })
            collection.forEach(async (item) => {
                let startDate = `${item[10].slice(0,10).slice(3,5)}/${item[10].slice(0,10).slice(0,2)}/${item[10].slice(0,10).slice(6,10)}`
                let endDate = `${item[10].slice(11).slice(3,5)}/${item[10].slice(11).slice(0,2)}/${item[10].slice(11).slice(6,10)}`
                for (let d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 1)) {
                    if(new Date(d).getDay()+1 == item[0]) {
                        let time = new Date(d).toLocaleDateString("en-US").split('/')
                        let month = time[0].length=== 1 ? '0'+time[0] : time[0]
                        let day = time[1].length=== 1 ? '0'+time[1] : time[1]
                        let dayConvert = '20'+time[2]+'-'+month+'-'+ day
                        insertEvent(dayConvert,{
                            day: dayConvert,
                            id: new Date().getTime().toString(),
                            dayOfWeek: item[0],
                            name: item[4],
                            location: item[9],
                            teacher: item[7],
                            start: item[8]
                        })
                    }
                }
            })
    } catch(err) {
        Promise.reject(err)
    }
    
}

function createDaysEmpty() {
    let days = []
        for(let d = new Date('2019-05-05'); d <= new Date('2020-03-03'); d.setDate(d.getDate() + 1) ) {
            let time = new Date(d).toLocaleDateString("en-US").split('/')
            let month = time[0].length=== 1 ? '0'+time[0] : time[0]
            let day = time[1].length=== 1 ? '0'+time[1] : time[1]
            let dayConvert = '20'+time[2]+'-'+month+'-'+ day
            days.push({
                day: dayConvert,
                events: []
            })
        }
    return createSchedule({id:1,days:days})
}

function getDataToRealm() {
    return new Promise((resolve, reject) => {
        queryDays().then((res) => {
            let objItems = res.reduce(function (result, item) {
                if(!result[item.day]) {
                    if(item.events.length > 1){
                        let sortEvents = []
                        for(let obj in item.events){
                            sortEvents.push(item.events[obj])
                        }
                        sortEvents.sort((a, b) => {
                            return parseInt(a.start.split(':')[0]) - parseInt(b.start.split(':')[0])
                        })
                        result[item.day] = sortEvents
                    } else {
                        result[item.day] = item.events
                    }
                }
                
                return result
            }, {})
            resolve(objItems)
        }).catch(err => {
            reject(err)
        })
    })
}


export default ScheduleSagas