import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native'
import Canlendar from '../components/Canlendar'
import Spinner from 'react-native-loading-spinner-overlay'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux'

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    flex: {
        flex:1
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        marginLeft:20,
        marginTop:height*0.05,
        color:'#272F5E'
    },
    containerCalendar : {
        flex:0.8,
        backgroundColor:'#FFFFFF',
        borderRadius:30,
        marginTop:-height*0.05,
        marginBottom:10,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})

export default Schedule = (props) => {
    return (
        <View style={[styles.flex,{backgroundColor:'#F9F9FB'}]}>
            <View style={{flex:0.2, backgroundColor:'#D4E7FE'}}>
                <Text style={styles.title}><Feather name='calendar' size={30} color='#8288A6'/>  Schedule</Text>
            </View>
            <View style={[styles.shadow,styles.containerCalendar]}>
            <Spinner
                visible={props.processing}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
                <Canlendar props={props.navigation}></Canlendar>
            </View>
        </View>
    )
}

