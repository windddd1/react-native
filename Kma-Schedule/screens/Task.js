import React,{ useState, useEffect, useMemo } from 'react';
import { StyleSheet, Dimensions, Animated, View, Text, Image, ScrollView, TouchableOpacity,ImageBackground } from 'react-native'


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
    }
})

export default Task = (props) => {
    return (
        <Text>Task</Text>
    )
}

