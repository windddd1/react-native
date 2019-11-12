
import React,{ useState, useEffect, useMemo, Component } from 'react'
import {  Tab, Tabs, ScrollableTab ,Item, Picker} from 'native-base'
import { StyleSheet, Dimensions, View, Text , Button,Alert} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import XLSX from 'xlsx'

import { insertDays, queryDays} from '../databases/allSchemas'


import { writeFile, readFile, DocumentDirectoryPath,ExternalDirectoryPath } from 'react-native-fs';
const DDP = ExternalDirectoryPath + "/";
const input = res => res;
const output = str => str;


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
})

export default CreateInfo = (props) => {
    const [file, setFile] = useState()
    
    
    importFile = () => {
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
        
    }
    query = () => {
        queryDays().then((res) => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <View style={[styles.flex,{backgroundColor:'#F9F9FB'}]}>
        <View style={{flex:0.2, backgroundColor:'#D4E7FE'}}>
            <View style={[{marginLeft:20,marginTop:height*0.02,}]}>
                <Text style={{fontSize:24,fontWeight:'bold',color:'#272F5E'}}><Feather name='calendar' size={30} color='#8288A6'/>  Create Schedule</Text>
                <Item picker style={{ width: 100 ,borderColor:'transparent',marginLeft:35}}>
                    <Picker
                        mode="dropdown"
                        style={{ fontSize:24,fontWeight:'bold',color:'#272F5E' }}
                        placeholderIconColor="#007aff"
                    >
                        <Picker.Item label="AT13" value="key0" />
                        <Picker.Item label="CT1" value="key1" />
                        <Picker.Item label="AT14" value="key2" />
                        <Picker.Item label="AT15" value="key3" />
                        <Picker.Item label="AT16" value="key4" />
                    </Picker>
                </Item>
            </View>
        </View>
        <View style={[styles.shadow,styles.containerCalendar,styles.shadow]}>
        <Tabs style={{marginHorizontal:36}} tabBarUnderlineStyle={{backgroundColor:'#D4E7FE'}} renderTabBar={()=> <ScrollableTab style={{backgroundColor:'#FFFFFF'}}/>}>
            <Tab heading="Tab1" activeTabStyle={{backgroundColor:'#FFFFFF'}} activeTextStyle={{color:'#272F5E',fontSize:14,fontWeight:'bold'}} textStyle={{color:'#272F5E',fontSize:14,fontWeight:'bold'}} tabStyle={{backgroundColor:'#FFFFFF',borderTopLeftRadius:30}} style={{borderRadius:30}}>
                <View>
                <Text style={styles.instructions}>Import Data</Text>
                    <Button onPress={()=>{importFile()}} title="insert" color="#841584" />
                    <Button onPress={()=>{query()}} title="query" color="#841584" />
                </View>
            </Tab>
            <Tab heading="Tab2" activeTabStyle={{backgroundColor:'#FFFFFF'}} activeTextStyle={{color:'#272F5E',fontSize:14,fontWeight:'bold'}} textStyle={{color:'#272F5E',fontSize:14,fontWeight:'bold'}} tabStyle={{backgroundColor:'#FFFFFF'}} >
                <Text>abc</Text>
            </Tab>
            <Tab heading="Tab3" activeTabStyle={{backgroundColor:'#FFFFFF'}} activeTextStyle={{color:'#272F5E'}} textStyle={{color:'#272F5E'}} tabStyle={{backgroundColor:'#FFFFFF'}} style={{borderRadius:30}}>
                <Text>abc</Text>
            </Tab>
            <Tab heading="Tab4" activeTabStyle={{backgroundColor:'#FFFFFF'}} activeTextStyle={{color:'#272F5E'}} textStyle={{color:'#272F5E'}} tabStyle={{backgroundColor:'#FFFFFF'}} style={{borderRadius:30}}>
                <Text>abc</Text>
            </Tab>
            <Tab heading="Tab5" activeTabStyle={{backgroundColor:'#FFFFFF'}} activeTextStyle={{color:'black'}} textStyle={{color:'black'}} tabStyle={{backgroundColor:'#FFFFFF'}} >
                <Text>abc</Text>
            </Tab>
        </Tabs>
        </View>
    </View>
    )
}

