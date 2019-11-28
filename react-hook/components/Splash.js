import React,{ useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native'



export default Splash = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello, This is Splash</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(32, 53, 70)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        color: 'white'
    }
})