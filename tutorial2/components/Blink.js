import React, { Component } from 'react'
import { Text, View } from 'react-native'

class Blink extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showText: true
        }
        const taskTodo = () => {
            this.setState( oldState => {
                return {
                    showText: !oldState.showText
                }
            })
        }
        setInterval(taskTodo, 500)
    }
    render(){
        let textDisplay = this.state.showText ? this.props.inputText : '';
        return (
            <View>
                <Text> {textDisplay}</Text>
            </View>
        )
    }
}

export default class TextBlink extends React.Component {
    render() {
        return (
            <View>
                <Blink inputText="hihi"></Blink>
                <Blink inputText="haha"></Blink>
            </View>
        )
    }
}