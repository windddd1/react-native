import React, { useState, useEffect, useMemo, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, StatusBar, View, Text, Dimensions, TouchableOpacity, Image,FlatList } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Mdi from 'react-native-vector-icons/MaterialCommunityIcons'
import ScheduleActions from '../redux/_schedule-redux'
import { makeSelectClassByNow } from '../reselect/_schedule-reselect'

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
    time: {
        marginLeft: width * 0.80,
        top: 30, color: '#2B3961',
        fontWeight: 'bold',
        fontSize: 14
    },
    avatarUser: {
        width: 50,
        height: 50,
        borderColor: '#EBE5F0',
        marginHorizontal: 35,
        marginTop: height * 0.05,
        borderRadius: 15
    },
    titleHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#343F85'
    },
    contentHeader: {
        fontSize: 15,
        color: '#606F9E'
    },
    containerSchedule: {
        flex: 0.7,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        marginTop: -height * 0.05,
        marginBottom: 10,
        paddingHorizontal: width * 0.07
    },
    contentTitleSchedule: {
        color: '#3A394E',
        fontSize: 20,
        fontWeight: 'bold'
    },
    moreBtn: {
        fontWeight: '500',
        fontSize: 16,
        color: '#343F85'
    },
    totalClasses: {
        fontSize: 18,
        marginLeft: 5,
        color: '#BFBEC5'
    },
    task: {
        backgroundColor: '#FEF5F6',
        height: height * 0.18,
        width: height * 0.18,
        marginTop: 15,
        borderRadius: 20,
        padding: 15
    },
    containerClasses: {
        backgroundColor:'#F9F9FA',
        height:height*0.15,
        borderRadius:12,
        marginVertical:height*0.01,
        marginHorizontal:width*0.02
    },
    colorIcon: {
        color:'#B9B8C1'
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
    },
    center: {
        justifyContent:'center',
        alignItems: 'center'
    },
})


function Item(events) {
    return (
        <TouchableOpacity onPress={()=>{events.navigation.navigate('Schedule')}} activeOpacity={0.9}>
            <View style={[styles.containerClasses,styles.shadow,styles.row]}>
            <View style={[{flex:0.2},styles.center]}>
                <Text style={styles.hour}>{events.events.start.slice(0,5)}</Text>
                <Text style={styles.amPm}>{events.events.start.slice(5)}</Text>
            </View>
            <View style={[styles.detailClasses]}>
                <Text style={styles.nameTeacher}>{events.events.name}</Text>
                <Text style={[styles.colorIcon]}><FontAwesome name="map-marker" size={14} color="#B8B8C1"/>  {events.events.location}</Text>
                <Text style={[styles.colorIcon]}><Mdi name="teach" size={14} color="#B8B8C1"/>{events.events.teacher}</Text>
            </View>
        </View>
        </TouchableOpacity>
    )
}

export default Home = (props) => {
    const dispatch = useDispatch()
    const processing = useSelector(state => state.schedule.processing)
    const events = useSelector(makeSelectClassByNow)
    const createScheduleRequest = () => {
        dispatch(ScheduleActions.createScheduleRequest())
    }
    const getEventByNow = () => {
        dispatch(ScheduleActions.getEventByNowRequest())
    }
    useEffect(() => {
        createScheduleRequest()
        getEventByNow()
        const focusListener = props.navigation.addListener('didFocus', () => {
            getEventByNow()
        })
    }, [])
    return (
        <View style={[styles.flex, { backgroundColor: '#F9F9FB' }]}>
            <StatusBar backgroundColor="#D4E7FE" barStyle="dark-content" />
            <Spinner
                visible={processing}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={{ flex: 0.3, backgroundColor: '#D4E7FE' }}>
                <Text style={[styles.time]}>{new Date().toLocaleDateString('en-US')}</Text>
                <View style={[styles.row]}>
                    <Image style={[styles.avatarUser]} source={{ uri: 'https://scontent.fhan5-3.fna.fbcdn.net/v/t1.0-9/52505095_1876799132446948_6071773151568592896_n.jpg?_nc_cat=111&cachebreaker=sd&_nc_oc=AQlUlYjSBITqSZuMqppt9X9DoG8RjsmWR3zeytx33eSucUq3wh1u_RByeqpltF9amH0&_nc_ht=scontent.fhan5-3.fna&oh=48956511baa724f81ecd57bedbb7180b&oe=5E62A9F2' }}></Image>
                    <View style={{ marginTop: height * 0.05 }}>
                        <Text style={[styles.titleHeader]}>Hello Phong</Text>
                        <Text style={[styles.contentHeader]}>Here is a list of schedule </Text>
                        <Text style={[styles.contentHeader]}>you need to check...</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.shadow, styles.containerSchedule]}>
                <View style={{ flex: 0.5 ,marginBottom:50}}>
                    <View style={[styles.row, { justifyContent: 'space-between', paddingTop: height * 0.025 }]}>
                        <View style={[styles.row]}>
                            <Text style={[styles.contentTitleSchedule]}>Today Classes</Text>
                            <Text style={[styles.totalClasses]}>({events.length})</Text>
                        </View>
                        <View><TouchableOpacity onPress={()=>{props.navigation.navigate('Schedule')}}><Text style={[styles.moreBtn]}>More</Text></TouchableOpacity></View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={events}
                            keyExtractor={(item, index) => index.toString()}    //TODO:Chosse key for a item
                            renderItem={({ item }) => <Item events={item} navigation={props.navigation}></Item>}
                        >
                        </FlatList>
                    </View>
                </View>
                <View style={{ flex: 0.5 }}>
                    <View style={[{ justifyContent: 'space-between' }, styles.row]}>
                        <Text style={[styles.contentTitleSchedule]}>Your Task</Text>
                        <TouchableOpacity onPress={()=>{props.navigation.navigate('Task')}}><Text style={[styles.moreBtn]}>More</Text></TouchableOpacity>
                    </View>
                    <View style={styles.task}>
                        <Text>Updating...</Text>
                        <Text>Updating...</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

