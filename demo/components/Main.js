import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, Image, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, StatusBar, Keyboard, TouchableWithoutFeedback } from 'react-native'
import Splash from './Splash'
import Login from './Login'

export default Main = (props) => {
    const [currentScreen, setCurrentScreen] = useState('Splash')

    setTimeout(() => {
        setCurrentScreen('Login')
    },2000)
    console.log(currentScreen)
    let mainScreen  = currentScreen === 'Splash' ? <Splash></Splash> : <Login></Login>
    return mainScreen
}