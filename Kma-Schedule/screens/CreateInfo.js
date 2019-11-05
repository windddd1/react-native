
import React,{ useState, useEffect, useMemo, Component } from 'react'
import { Container, Header, Tab, Tabs, ScrollableTab ,Item, Picker} from 'native-base'
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

export default Schedule = (props) => {
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

