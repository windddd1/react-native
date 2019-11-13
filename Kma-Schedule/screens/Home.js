import React,{ useState, useEffect, useMemo, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet,StatusBar, View, Text, Dimensions, TouchableOpacity, Image  } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Mdi from 'react-native-vector-icons/MaterialCommunityIcons'
import ScheduleActions from '../redux/_schedule-redux'


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
        marginLeft:width*0.75,
        top:30,color:'#2B3961',
        fontWeight:'bold',
        fontSize:14
    },
    avatarUser : {
        width:50,
        height:50,
        borderColor:'#EBE5F0',
        marginHorizontal:35,
        marginTop:height*0.05,
        borderRadius:15
    },
    titleHeader:{
        fontSize:24,
        fontWeight:'bold',
        color:'#343F85'
    },  
    contentHeader: {
        fontSize:15,
        color:'#606F9E'
    },
    containerSchedule : {
        flex:0.7,
        backgroundColor:'#FFFFFF',
        borderRadius:30,
        marginTop:-height*0.05,
        marginBottom:10,
        paddingHorizontal:width*0.07
    },
    contentTitleSchedule: {
        color:'#3A394E',
        fontSize:20,
        fontWeight:'bold'
    },
    moreBtn: {
        fontWeight:'500',
        fontSize:16,
        color:'#343F85'
    },
    totalClasses: {
        fontSize:18,
        marginLeft:5,
        color:'#BFBEC5'
    },
    task: {
        backgroundColor:'#FEF5F6',
        height:height*0.18,
        width:height*0.18,
        marginTop:15,
        borderRadius:20,
        padding:15
    }
})

const classes = [
    {
        id:'1',
        start:'07:00 AM',
        end:'09:30 AM',
        name: 'The Basic of Typography',
        location: 'Room 204',
        teacher: 'Do Tuan Anh'
    },
    {
        id:'2',
        start:'09:30 AM',
        end:'11:30 AM',
        name: 'Programing C++',
        location: 'Room 304',
        teacher: 'Nguyen Anh Tien'
    },
] 

export default Home = (props) => {
    const dispatch = useDispatch()
    const processing = useSelector(state => state.schedule.processing)
    const createScheduleRequest = () => {
        dispatch(ScheduleActions.createScheduleRequest())
    }
    useEffect(()=>{
        createScheduleRequest()
    },[])
    return (
        <View style={[styles.flex,{backgroundColor:'#F9F9FB'}]}>
            <StatusBar backgroundColor="#D4E7FE" barStyle="dark-content"/>
            <Spinner
                visible={processing}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={{flex:0.3, backgroundColor:'#D4E7FE'}}>
                <Text style={[styles.time]}>Wed 10 Oct</Text>
                <View style={[styles.row]}>
                    <Image style={[styles.avatarUser]} source={{uri: 'https://scontent.fhan5-3.fna.fbcdn.net/v/t1.0-9/52505095_1876799132446948_6071773151568592896_n.jpg?_nc_cat=111&cachebreaker=sd&_nc_oc=AQlUlYjSBITqSZuMqppt9X9DoG8RjsmWR3zeytx33eSucUq3wh1u_RByeqpltF9amH0&_nc_ht=scontent.fhan5-3.fna&oh=48956511baa724f81ecd57bedbb7180b&oe=5E62A9F2'}}></Image>
                    <View style={{marginTop:height*0.05}}>
                        <Text style={[styles.titleHeader]}>Hello Phong</Text>
                        <Text style={[styles.contentHeader]}>Here is a list of schedule </Text>
                        <Text style={[styles.contentHeader]}>you need to check...</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.shadow,styles.containerSchedule]}>
                <View style={{flex:0.55}}>
                    <View style={[styles.row,{justifyContent:'space-between',paddingTop:height*0.025}]}>
                        <View style={[styles.row]}>
                            <Text style={[styles.contentTitleSchedule]}>Today Classes</Text>
                            <Text style={[styles.totalClasses]}>(3)</Text>
                        </View>
                        <View><TouchableOpacity><Text style={[styles.moreBtn]}>More</Text></TouchableOpacity></View>
                    </View>
                    <View style={{marginTop:10}}>
                        <View style={[{backgroundColor:'#F9F9FA', height:height*0.1,borderRadius:12,marginVertical:height*0.01},styles.shadow,styles.row]}>
                            <View style={{flex:0.2,justifyContent:'center',alignItems: 'center'}}>
                                <Text style={{fontSize:18, color:'#3D3C51',fontWeight:'bold'}}>07:00</Text>
                                <Text style={{fontSize:14, color:'#97969E',fontWeight:'600'}}>AM</Text>
                            </View>
                            <View style={[{flex:0.8,borderLeftWidth:2,borderLeftColor:'#EBEAEF',paddingHorizontal:15,paddingTop:10}]}>
                                <Text style={{fontWeight:'700',fontSize:16,color:'#606070'}}>The Basic of Typography</Text>
                                <Text style={{color:'#B9B8C1'}}><FontAwesome name="map-marker" size={14} color="#B8B8C1"/> Room 203</Text>
                                <Text style={{color:'#B9B8C1'}}><Mdi name="teach" size={14} color="#B8B8C1"/> Do Tuan Anh</Text>
                            </View>
                        </View>
                        <View style={[{backgroundColor:'#F9F9FA', height:height*0.1,borderRadius:12,marginVertical:height*0.01},styles.shadow,styles.row]}>
                            <View style={{flex:0.2,justifyContent:'center',alignItems: 'center'}}>
                                <Text style={{fontSize:18, color:'#3D3C51',fontWeight:'bold'}}>07:00</Text>
                                <Text style={{fontSize:14, color:'#97969E',fontWeight:'600'}}>AM</Text>
                            </View>
                            <View style={[{flex:0.8,borderLeftWidth:2,borderLeftColor:'#EBEAEF',paddingHorizontal:15,paddingTop:10}]}>
                                <Text style={{fontWeight:'700',fontSize:16,color:'#606070'}}>The Basic of Typography</Text>
                                <Text style={{color:'#B9B8C1'}}><FontAwesome name="map-marker" size={14} color="#B8B8C1"/> Room 203</Text>
                                <Text style={{color:'#B9B8C1'}}><Mdi name="teach" size={14} color="#B8B8C1"/> Do Tuan Anh</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flex:0.45}}>
                    <View style={[{justifyContent:'space-between'},styles.row]}>
                        <Text style={[styles.contentTitleSchedule]}>Your Task</Text>
                        <TouchableOpacity><Text style={[styles.moreBtn]}>More</Text></TouchableOpacity>
                    </View>
                    <View style={styles.task}>
                        <Text>sdfsdf</Text>
                        <Text>sdfsdf</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

