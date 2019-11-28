import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { Agenda } from 'react-native-calendars'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Mdi from 'react-native-vector-icons/MaterialCommunityIcons'
import ScheduleActions from '../redux/_schedule-redux'
import { makeSelectClasses } from '../reselect/_schedule-reselect'; 
import { useDispatch, useSelector } from 'react-redux'
const { width, height } = Dimensions.get('screen')

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
    containerEmptyDay: {
        backgroundColor:'#D4E7FE',
        height:height*0.15,
        borderRadius:12,
        marginVertical:height*0.01,
        marginRight:width*0.02,
        justifyContent: 'center',
        alignItems: 'center'
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
    hour: {
        fontSize:18,
        color:'#3D3C51',
        fontWeight:'bold'
    },
    amPm: {
        fontSize:18, 
        color:'#3D3C51',
        fontWeight:'bold'
    }
})

export default Canlendar = React.memo(function MyComponent(props) {
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
    const dispatch = useDispatch()
    const classes = useSelector(makeSelectClasses)
    const getClasses = () => {
        dispatch(ScheduleActions.getScheduleRequest())
    }
    useEffect(()=>{
        const focusListener = props.props.addListener('willFocus', () => {
            getClasses()
        })
        getClasses()
    },[])
    const renderClass = (item) => {
        return (
        <View style={[styles.containerClasses,styles.shadow,styles.row]}>
            <View style={[{flex:0.2},styles.center]}>
                <Text style={styles.hour}>{item.start.slice(0,5)}</Text>
                <Text style={styles.amPm}>{item.start.slice(5)}</Text>
            </View>
            <View style={[styles.detailClasses]}>
                <Text style={styles.nameTeacher}>{item.name}</Text>
                <Text style={[styles.colorIcon]}><FontAwesome name="map-marker" size={14} color="#B8B8C1"/>  {item.location}</Text>
                <Text style={[styles.colorIcon]}><Mdi name="teach" size={14} color="#B8B8C1"/>{item.teacher}</Text>
            </View>
        </View>
        )
    }

    const renderEmptyDate = () => {
        return (
            <View style={[styles.containerEmptyDay,styles.shadow,styles.row]}>
                <Text style={{fontWeight:'bold',fontSize:20,color:'#272F5E'}}>
                    This day haven't event
                </Text>
            </View>
        )
    }

    return (
        <Agenda
            items={classes}
            renderEmptyDate={() => renderEmptyDate()}
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
})
