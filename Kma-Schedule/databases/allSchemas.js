import Realm from 'realm'
export const SCHEDULE_SCHEMA = 'schedule'
export const DAY_SCHEMA = 'day'
export const EVENT_SCHEMA = 'event'

export const ScheduleSchema = {
    name : SCHEDULE_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        days: { type: 'list', objectType: DAY_SCHEMA }
    }
}

export const DaySchema = {
    name : DAY_SCHEMA,
    primaryKey: 'day',
    properties: {
        day: 'string',
        events: { type: 'list', objectType: EVENT_SCHEMA }
    }
}

export const EventSchema = {
    name: EVENT_SCHEMA,
    primaryKey: 'id',
    properties: {
        day: 'string',
        id: 'string',
        dayOfWeek: 'string',
        name: 'string',
        location: 'string',
        teacher: 'string',
        start: 'string'
    }
}

const databaseOption = {
    path: 'scheduleApp.realm',
    schema: [ ScheduleSchema, EventSchema, DaySchema ],
    schemaVersion: 0
}

//function for days
export const insertDays = (days) => new Promise((resolve, reject) =>{
    Realm.open(databaseOption)
    .then(realm => {
        realm.write(() => {
            realm.create(SCHEDULE_SCHEMA,days)
            resolve()
        })
    }).catch((e) => {
        console.log(e)
        reject(e)
    })
})

export const queryDays = () => new Promise((resolve, reject) => {
    Realm.open(databaseOption)
    .then(realm => {
        let days = realm.objects(DAY_SCHEMA)
        resolve(days)
    }).catch((e) => {
        console.log(e)
        reject(e)
    })
})

export const insertEvent = (idDay, newEvent) => new Promise((resolve, reject) => {
    
    Realm.open(databaseOption)
    .then(realm => {
        let day = realm.objectForPrimaryKey(DAY_SCHEMA,idDay)
        console.log(day)
        //  realm.write(() => {
        //   day.events.push(newEvent)           
        // })

    }).catch((err) => {
        console.log(err)
        reject(err)
    })
})

export default new Realm(databaseOption)