import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, Image, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, StatusBar, Keyboard, TouchableWithoutFeedback } from 'react-native'


export default Login = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='light-content'></StatusBar>
            <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={-90} behavior={'padding'}>
                <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('../assests/logo.png')} style={styles.logo}>
                            </Image>
                            <Text style={styles.title}>React-Native</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <TextInput style={styles.input}
                                placeholder="Enter username/email"
                                placeholderTextColor="rgba(255,255,255,0.2)"
                                keyboardType='email-address'
                                returnKeyType='next'
                                autoCorrect={false}
                            ></TextInput>
                            <TextInput style={styles.input}
                                placeholder="Enter password"
                                placeholderTextColor='rgba(255,255,255,0.2)'
                                returnKeyType='go'
                                secureTextEntry
                                autoCorrect={false}
                            />
                            <TouchableOpacity style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>SIGN IN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(32, 53, 70)',
        flex: 1,
        flexDirection: 'column'
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingTop: -10
    },
    logo: {
        width: 75,
        height: 75,
        resizeMode: 'contain'
    },
    title: {
        color: '#f7c744',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },
    infoContainer: {
        // backgroundColor: 'red',
        position: 'absolute',
        height: 200,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        paddingHorizontal: 10,
        borderRadius: 4,
        marginBottom: 10
    },
    buttonContainer: {
        backgroundColor: '#f7c744',
        paddingVertical: 15,
        borderRadius:10
    },
    buttonText: {
        textAlign: 'center',
        color: 'rgb(32, 53, 70)',
        fontWeight: 'bold',
        fontSize: 18
    }
})
