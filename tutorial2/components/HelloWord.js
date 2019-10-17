import React, { Component } from 'react'
import { Text, Image, View, TextInput } from 'react-native'

export default class HelloWorld extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            typedText: 'haha'
        }
    }
    render(){
        let imageSource ={uri:"http://dangcongsan.vn/DATA/0/2019/09/file76xog5oc70i1g0dp219_156748_9282_7304_1567581048-20_11_49_618.jpg"}
        return (
            <View>
            <Text>{this.state.typedText}</Text>
            <TextInput style={ {
                height: 40,
                margin: 20,
                borderColor: 'gray',
                borderWidth: 1
            }}
                        keyboardType='email-address'
                        placeholder='Enter your email'
                        placeholderTextColor='red'
                        onChangeText={(text) => {this.setState((oldState)=> {return {typedText: text}})}}
            ></TextInput>
            </View>
        )
    }
}