import React from 'react'
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
const { width, height } = Dimensions.get('screen')
import Svg from 'react-native-svg';

const styles = StyleSheet.create({
    flex: {
        flex:1,
    },
    column: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    container: {
        flex:0.1,
        backgroundColor:'#F9F9FB',
        justifyContent:'space-between',
        paddingHorizontal:width * 0.07,
        paddingTop:15,
    },
})

// eslint-disable-next-line no-undef
export default BottomBar = (props) => {
    return (
        // <View style={[ styles.row ,styles.container ]}>
        //     <TouchableOpacity onPress={()=>{props.navigation.navigate('Home')}}><View><Feather name="home" size={30} color={props.navigation.state.index == 0 ? '#8288A6' : '#C0C4CC'} /></View></TouchableOpacity>
        //     <TouchableOpacity onPress={()=>{props.navigation.navigate('Splash')}}><View><Feather name="calendar" size={30} color={props.navigation.state.index == 1 ? '#8288A6' : '#C0C4CC'} /></View></TouchableOpacity>
        //     <TouchableOpacity ><View><Feather name="clipboard" size={30} color={props.navigation.state.index == 2 ? '#8288A6' : '#C0C4CC'} /></View></TouchableOpacity>
        //     <TouchableOpacity ><View><Feather name="settings" size={30} color={props.navigation.state.index == 3 ? '#8288A6' : '#C0C4CC'} /></View></TouchableOpacity>
        // </View>
        <>
            <Svg></Svg>
        </>
    )
}
