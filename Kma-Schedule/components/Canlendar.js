import React, { useState, useEffect, useMemo, Component } from 'react';
import { StyleSheet, View, Text, Dimensions,Alert } from 'react-native'
import { Agenda } from 'react-native-calendars'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Mdi from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import ScheduleActions from '../redux/_schedule-redux'
import Spinner from 'react-native-loading-spinner-overlay'
import { insertDays, queryDays,insertDay } from '../databases/allSchemas'

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
    const [ classes, setClasses ] = useState()
    useEffect(()=>{
        // props.getClasses()
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
            
            setClasses(objItems)
        }).catch(err => {
            console.log(err)
        })
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