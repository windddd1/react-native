
import React,{ useState, useEffect, useMemo, Component } from 'react'
import {  Tab, Tabs, ScrollableTab ,Item, Picker} from 'native-base'
import { StyleSheet, Dimensions, View, Text , Button,Alert} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import XLSX from 'xlsx'




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
		readFile(DDP + "schedule.xlsx", 'ascii').then((res) => {
            /* parse file */
            const wb = XLSX.read(input(res), {type:'binary'});

            /* convert first worksheet to AOA */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, {header:1})
            let collection = []
            let schedule = []
            data.forEach((item) => {
                if(['2','3','4','5','6','7'].includes(item[0])) {
                    let flagTime = item[8].split(',')[0]
                    if(flagTime == 1) {
                        item[8] = '07:00 AM'
                    } else if(flagTime == 4) {
                        item[8] = '09:30 AM'
                    } else if(flagTime == 7) {
                        item[8] = '12:30 PM'
                    } else if(flagTime == 10) {
                        item[8] = '15:00 PM'
                    } else if(flagTime == 13) {
                        item[8] = '18:00 PM'
                    } else if(flagTime == 9) {
                        item[8] = '14:15 PM'
                    }
                    collection.push(item)
                }
            })
            collection.forEach((item) => {
                let startDate = `${item[10].slice(0,10).slice(3,5)}/${item[10].slice(0,10).slice(0,2)}/${item[10].slice(0,10).slice(6,10)}`
                let endDate = `${item[10].slice(11).slice(3,5)}/${item[10].slice(11).slice(0,2)}/${item[10].slice(11).slice(6,10)}`
                for (let d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 1)) {
                    if(new Date(d).getDay()+1 == item[0]) {
                        let day = new Date(d).toLocaleDateString("en-US").split('/')
                        let dayConvert = day[1]+'-'+day[0]+'-'+day[2]
                        schedule.push({
                            day: dayConvert,
                            id: item[1],
                            dayOfWeek: item[0],
                            nameClass: item[4],
                            location: item[9],
                            teacher: item[7],
                            time: item[8]
                        })
                    }
                }
            })
            let objItems = schedule.reduce(function (result, item) {
                if(!result[item.day]) {
                    result[item.day] = [{
                        ...item
                    }]
                } else {
                    result[item.day].push({...item})
                    console.log(result[item.day])
                    result[item.day].sort((a, b) => {
                        return parseInt(a.time.split(':')[0]) - parseInt(b.time.split(':')[0])
                    })
                    console.log(result[item.day])
                }
                return result
            }, {})
        }).catch((err) => { Alert.alert("importFile Error", "Error " + err.message); });
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
                    <Button onPress={()=>{importFile()}} title="Import data from a spreadsheet" color="#841584" />
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

