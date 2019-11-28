
import React,{ useCallback } from 'react'
import { StyleSheet, Dimensions, View, Text , Button,Alert,TouchableOpacity,TextInput } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import ScheduleActions from '../redux/_schedule-redux'
import { deleteEvent,queryByDay,queryDays } from '../databases/allSchemas'
import NotifService from '../notification/notiService'
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    flex: {
        flex:1,
        backgroundColor:'#F9F9FB'
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    containerCalendar : {
        flex:0.8,
        backgroundColor:'#FFFFFF',
        borderRadius:30,
        marginTop:-height*0.05,
        marginBottom:10,
        maxWidth:width
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
    alignItems: {
        alignItems:'center',
        justifyContent:'center'
    },
    button: {
        height:50,
        width:150,
        backgroundColor:'#272F5E',
        borderRadius:12
    },
    contentButton: {
        color:'#FFFFFF',
        fontSize:20
    },
    containerHeader: {
        flex:0.2, 
        backgroundColor:'#D4E7FE'
    },
    titleHeader: {
        fontSize:24,
        fontWeight:'bold',
        color:'#272F5E'
    },
    alignTitleHeader: {
        marginLeft:20,
        marginTop:height*0.02
    }
})

export default CreateInfo = (props) => {
    const dispatch = useDispatch()
    const processing = useSelector(state => state.schedule.processing)
    const events = useSelector(state => state.schedule.data.eventByNow)
    const importFile = useCallback(
        () =>  dispatch(ScheduleActions.getDataFromExcelRequest()),
        [dispatch]
    )
    const getClasses = useCallback(
        () =>  dispatch(ScheduleActions.getScheduleRequest()),
        [dispatch]
    )

    const deleteData = () => {
        deleteEvent().then(() => {
            const notif = new NotifService()
            notif.cancelAll()
        }).catch(err => {
            console.log(err)
        })
    }
    const noti = () => {
        const notif = new NotifService()
        let dayConvert = '2019'+'-'+'10'+'-'+ '18'
        notif.scheduleNotif({
            time: dayConvert+' '+'09:52',
            id:'abcc',
            name: 'phong123',
            location: 'phong123',
            start: '09:40 PM'
        })
    }
    return (
        <View style={[styles.flex]}>
        <Spinner
            visible={processing}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.containerHeader}>
            <View style={[styles.alignTitleHeader]}>
                <Text style={styles.titleHeader}><Feather name='settings' size={30} color='#8288A6'/>  Setting</Text>
            </View>
        </View>
        <View style={[styles.shadow,styles.containerCalendar,styles.shadow,styles.alignItems]}>
            <TouchableOpacity onPress={()=>{importFile()}} activeOpacity={0.9}>
                <View style={[styles.button,styles.alignItems]}>
                    <Text style={styles.contentButton}>Add schedule</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{deleteData()}} style={{marginTop:20}} activeOpacity={0.9}>
                <View style={[styles.button,styles.alignItems]}>
                    <Text style={styles.contentButton}>Delete</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{noti()}} style={{marginTop:20}} activeOpacity={0.9}>
                <View style={[styles.button,styles.alignItems]}>
                    <Text style={styles.contentButton}>noti</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
    )
}

