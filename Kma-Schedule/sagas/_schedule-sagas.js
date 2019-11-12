import { put, call } from 'redux-saga/effects'
import ScheduleActions from '../redux/_schedule-redux'
import XLSX from 'xlsx'
import { insertDays, queryDays,insertEvent } from '../databases/allSchemas'


import { readFile,ExternalDirectoryPath } from 'react-native-fs';
const DDP = ExternalDirectoryPath + "/";
const input = res => res;


const ScheduleSagas = {
    *postSchedule() {
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
        insertDays({id:1,days:days})
        .then(()=>{
            console.log('completed')
        }).catch((err) => {
            console.log(err)
        })
    },
    *getDataFromExcel() {
        try {
            const res = yield call(importFile)
            const wb = XLSX.read(input(res), {type:'binary'});
            /* convert first worksheet to AOA */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, {header:1})
            let collection = []
            let schedule = []
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
            collection.forEach((item) => {
                let startDate = `${item[10].slice(0,10).slice(3,5)}/${item[10].slice(0,10).slice(0,2)}/${item[10].slice(0,10).slice(6,10)}`
                let endDate = `${item[10].slice(11).slice(3,5)}/${item[10].slice(11).slice(0,2)}/${item[10].slice(11).slice(6,10)}`
                for (let d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 1)) {
                    if(new Date(d).getDay()+1 == item[0]) {
                        let time = new Date(d).toLocaleDateString("en-US").split('/')
                        let month = time[0].length=== 1 ? '0'+time[0] : time[0]
                        let day = time[1].length=== 1 ? '0'+time[1] : time[1]
                        let dayConvert = '20'+time[2]+'-'+month+'-'+ day
                        schedule.push({
                            day: dayConvert,
                            id: item[1],
                            dayOfWeek: item[0],
                            name: item[4],
                            location: item[9],
                            teacher: item[7],
                            start: item[8]
                        })
                        insertEvent(dayConvert,{
                            day: dayConvert,
                            id: new Date().getTime().toString(),
                            dayOfWeek: item[0],
                            name: item[4],
                            location: item[9],
                            teacher: item[7],
                            start: item[8]
                        })
                        .then(()=>{console.log('done')})
                    }
                }
            })
            let objItems = schedule.reduce(function (result, item) {
                if(!result[item.day]) {
                    result[item.day] = [{
                        ...item
                    }]
                } else {
                    result[item.day].push({...item})
                    result[item.day].sort((a, b) => {
                        return parseInt(a.start.split(':')[0]) - parseInt(b.start.split(':')[0])
                    })
                }
                return result
            }, {})
            yield put(ScheduleActions.getScheduleSuccess(objItems))
        } catch (err) {
            console.log(err)
            yield put(ScheduleActions.getScheduleFail(err))
        }
    },
    
}

function importFile() {
    return readFile(DDP + "schedule.xls", 'ascii')
}


export default ScheduleSagas