import React, { useState, useEffect, useMemo, Component } from 'react';
import { StyleSheet, View, Text, Dimensions,Alert } from 'react-native'
import { Agenda } from 'react-native-calendars'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Mdi from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import ScheduleActions from '../redux/_schedule-redux'
import Spinner from 'react-native-loading-spinner-overlay'

const { width, height } = Dimensions.get('screen')

const mapDispatchToProps = dispatch => ({
    getClasses: () => dispatch(ScheduleActions.getScheduleRequest()),
    
})

const mapStateToProps = state => {
    return {
        processing: state.schedule.processing,
        classes: state.schedule.data.classes,
        error: state.schedule.error
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
    },
    center: {
        justifyContent:'center',
        alignItems: 'center'
    },
    colorIcon: {
        color:'#B9B8C1'
    },
    containerClasses: {
        backgroundColor:'#F9F9FA',
        height:height*0.15,
        borderRadius:12,
        marginVertical:height*0.01,
        marginRight:width*0.02
    },
    detailClasses: {
        flex:0.8,
        borderLeftWidth:2,
        borderLeftColor:'#EBEAEF',
        paddingHorizontal:15,
        paddingTop:10
    },
    nameTeacher: {
        fontWeight:'700',
        fontSize:16,
        color:'#606070'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})

const Canlendar = (props) => {
    const styleCalendar = {
        backgroundColor: '#ffffff',
        agendaKnobColor: '#343F85',
        selectedDayBackgroundColor: '#343F85',
        dotColor: '#343F85',
        monthTextColor: '#343F85',
        todayTextColor: '#343F85',
        dayTextColor: '#606070',
        agendaTodayColor: '#272F5E'
    }
    const classes = {
        '2019-11-04': [{
            id: '1',
            start: '07:00 AM',
            end: '09:30 AM',
            name: 'The Basic of Typography',
            location: 'Room 204',
            teacher: 'Do Tuan Anh'
        }],
        '2019-11-05': [{
            id: '1',
            start: '07:00 AM',
            end: '09:30 AM',
            name: 'The Basic of Typography',
            location: 'Room 204',
            teacher: 'Do Tuan Anh'
        }],
        '2019-11-06': [{
            id: '1',
            start: '07:00 AM',
            end: '09:30 AM',
            name: 'The Basic of Typography',
            location: 'Room 204',
            teacher: 'Do Tuan Anh'
        }]
        ,
        '2019-11-07': [{
            id: '1',
            start: '07:00 AM',
            end: '09:30 AM',
            name: 'The Basic of Typography',
            location: 'Room 204',
            teacher: 'Do Tuan Anh'
        },
        {
            id: '2',
            start: '09:30 AM',
            end: '11:30 AM',
            name: 'Programing C++',
            location: 'Room 304',
            teacher: 'Nguyen Anh Tien'
        },]
        ,
        '2019-11-08': [{
            id: '1',
            start: '07:00 AM',
            end: '09:30 AM',
            name: 'The Basic of Typography',
            location: 'Room 204',
            teacher: 'Do Tuan Anh'
        },
        {
            id: '2',
            start: '09:30 AM',
            end: '11:30 AM',
            name: 'Programing C++',
            location: 'Room 304',
            teacher: 'Nguyen Anh Tien'
        },]
        ,
        '2019-11-09': [{
            id: '1',
            start: '07:00 AM',
            end: '09:30 AM',
            name: 'The Basic of Typography',
            location: 'Room 204',
            teacher: 'Do Tuan Anh'
        },
        {
            id: '2',
            start: '09:30 AM',
            end: '11:30 AM',
            name: 'Programing C++',
            location: 'Room 304',
            teacher: 'Nguyen Anh Tien'
        },]
        ,
        '2019-11-10': [{
            id: '1',
            start: '07:00 AM',
            end: '09:30 AM',
            name: 'The Basic of Typography',
            location: 'Room 204',
            teacher: 'Do Tuan Anh'
        },
        {
            id: '2',
            start: '09:30 AM',
            end: '11:30 AM',
            name: 'Programing C++',
            location: 'Room 304',
            teacher: 'Nguyen Anh Tien'
        },]
        ,
        '2019-11-11': [],
        '2019-11-12': [],
        '2019-11-13': [{
            id: '1',
            start: '07:00 AM',
            end: '09:30 AM',
            name: 'The Basic of Typography',
            location: 'Room 204',
            teacher: 'Do Tuan Anh'
        },
        {
            id: '2',
            start: '09:30 AM',
            end: '11:30 AM',
            name: 'Programing C++',
            location: 'Room 304',
            teacher: 'Nguyen Anh Tien'
        },],
        '2019-11-13': [{
            id: '1',
            start: '07:00 AM',
            end: '09:30 AM',
            name: 'The Basic of Typography',
            location: 'Room 204',
            teacher: 'Do Tuan Anh'
        },
        {
            id: '2',
            start: '09:30 AM',
            end: '11:30 AM',
            name: 'Programing C++',
            location: 'Room 304',
            teacher: 'Nguyen Anh Tien'
        },],
        '2019-11-14': [{
            id: '1',
            start: '07:00 AM',
            end: '09:30 AM',
            name: 'The Basic of Typography',
            location: 'Room 204',
            teacher: 'Do Tuan Anh'
        },
        {
            id: '2',
            start: '09:30 AM',
            end: '11:30 AM',
            name: 'Programing C++',
            location: 'Room 304',
            teacher: 'Nguyen Anh Tien'
        },],
        '2019-11-15': [],
        '2019-11-16': [{
            id: '1',
            start: '07:00 AM',
            end: '09:30 AM',
            name: 'The Basic of Typography',
            location: 'Room 204',
            teacher: 'Do Tuan Anh'
        },
        {
            id: '2',
            start: '09:30 AM',
            end: '11:30 AM',
            name: 'Programing C++',
            location: 'Room 304',
            teacher: 'Nguyen Anh Tien'
        },],
        '2019-11-17': [],
        '2019-11-18': [],
        '2019-11-19': [],
        '2019-11-20': [],
        '2019-11-21': [],
        '2019-11-22': [],
        '2019-11-23': [],
        '2019-11-24': [],
        '2019-11-25': [],
        '2019-11-26': [],
        '2019-11-27': [{
            id: '1',
            start: '07:00 AM',
            end: '09:30 AM',
            name: 'The Basic of Typography',
            location: 'Room 204',
            teacher: 'Do Tuan Anh'
        }],
        '2019-11-28': [{
            id: '1',
            start: '07:00 AM',
            end: '09:30 AM',
            name: 'The Basic of Typography',
            location: 'Room 204',
            teacher: 'Do Tuan Anh'
        }],
        '2019-11-29': [{
            id: '1',
            start: '07:00 AM',
            end: '09:30 AM',
            name: 'The Basic of Typography',
            location: 'Room 204',
            teacher: 'Do Tuan Anh'
        }],
        '2019-11-30': [{
            id: '1',
            start: '07:00 AM',
            end: '09:30 AM',
            name: 'The Basic of Typography',
            location: 'Room 204',
            teacher: 'Do Tuan Anh'
        }],
        '2019-12-01': [{
            id: '1',
            start: '07:00 AM',
            end: '09:30 AM',
            name: 'The Basic of Typography',
            location: 'Room 204',
            teacher: 'Do Tuan Anh'
        }],
    }
    useEffect(()=>{
        // props.getClasses()
    },[])
    renderClass = (item) => {
        return (
        <View style={[styles.containerClasses,styles.shadow,styles.row]}>
            <Spinner
                visible={props.processing}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={[{flex:0.2},styles.center]}>
                <Text style={{fontSize:18, color:'#3D3C51',fontWeight:'bold'}}>{item.start.slice(0,5)}</Text>
                <Text style={{fontSize:14, color:'#97969E',fontWeight:'600'}}>{item.start.slice(5)}</Text>
            </View>
            <View style={[styles.detailClasses]}>
                <Text style={styles.nameTeacher}>{item.name}</Text>
                <Text style={[styles.colorIcon]}><FontAwesome name="map-marker" size={14} color="#B8B8C1"/>  {item.location}</Text>
                <Text style={[styles.colorIcon]}><Mdi name="teach" size={14} color="#B8B8C1"/>{item.teacher}</Text>
            </View>
        </View>
        )
    }



    return (
        <Agenda
            items={classes}
            renderEmptyDate={() => { return (<Text>No Data</Text>) }}
            rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
            renderItem={(item, firstItemInDay) => renderClass(item)}
            theme={{
                'stylesheet.calendar.header': {
                    week: {
                        marginTop: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }
                },
                ...styleCalendar
            }}
            style={[{ borderRadius: 30 }, styles.shadow]}
        />
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Canlendar)