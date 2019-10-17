import React, { Component } from 'react'
import { Image } from 'react-native'

export default class ImageRobot extends React.Component {
    render(){
        return (
            <Image source={{uri:"http://dangcongsan.vn/DATA/0/2019/09/file76xog5oc70i1g0dp219_156748_9282_7304_1567581048-20_11_49_618.jpg"}}
                style= {{width:200,height:200,margin:50}}
            ></Image>
        )
    }
}