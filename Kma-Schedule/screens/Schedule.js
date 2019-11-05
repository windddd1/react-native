import React,{ useState, useEffect, useMemo } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native'
import Canlendar from '../components/Canlendar'
import Feather from 'react-native-vector-icons/Feather'

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
    containerCalendar : {
        flex:0.8,
        backgroundColor:'#FFFFFF',
        borderRadius:30,
        marginTop:-height*0.05,
        marginBottom:10,
    },
})

export default Schedule = (props) => {
    return (
        <View style={[styles.flex,{backgroundColor:'#F9F9FB'}]}>
            <View style={{flex:0.2, backgroundColor:'#D4E7FE'}}>
                <Text style={{fontSize:24,fontWeight:'bold',marginLeft:20,marginTop:height*0.05,color:'#272F5E'}}><Feather name='calendar' size={30} color='#8288A6'/>  Schedule</Text>
            </View>
            <View style={[styles.shadow,styles.containerCalendar]}>
                <Canlendar></Canlendar>
            </View>
        </View>
    )
}

