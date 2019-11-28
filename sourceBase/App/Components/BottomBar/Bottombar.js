import React from 'react'
import { StyleSheet, View, Dimensions, SafeAreaView, Animated,Text } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Svg, { Path } from 'react-native-svg'
import * as shape from 'd3-shape'
import StaticTabbar from './StaticTabbar'

const { width } = Dimensions.get('screen')
const height = 80
const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const tabs = [
    { name: 'grid' },
    { name: 'list' },
    { name: 'refresh-cw' },
    { name: 'box' },
    { name: 'user' },
]
const tabWidth = width / tabs.length
// .curve(shape.curveBasis)
const getPath = () => {
    const left = shape.line().x(d => d.x).y(d => d.y)([
        { x: 0, y: 0 },
        { x: width, y: 0 },
    ]);
    const tab = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasis)([
        { x: width, y: 0 },
        { x: width + 5, y: 0 },
        { x: width + 10, y: 10 },
        { x: width + 15, y: height - 25 },
        { x: width + tabWidth - 15, y: height - 25 },
        { x: width + tabWidth - 10, y: 10 },
        { x: width + tabWidth - 5, y: 0 },
        { x: width + tabWidth, y: 0 },
    ]);
    const right = shape.line().x(d => d.x).y(d => d.y)([
        { x: width + tabWidth, y: 0 },
        { x: width * 2, y: 0 },
        { x: width * 2, y: height },
        { x: 0, y: height },
        { x: 0, y: 0 },
    ]);
    return `${left} ${tab} ${right}`;
}

const d = getPath()

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    column: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        backgroundColor: '#E66059',
        justifyContent: 'flex-end',
    },
    safeArea: {
        backgroundColor: 'white',
    },
})

// eslint-disable-next-line no-undef
export default BottomBar = (props) => {
    const value = new Animated.Value(0)
    const translateX = value.interpolate({
        inputRange: [0, width],
        outputRange: [-width, 0],
    })
    return (
        <View style={styles.container}>
            <View style={{ width, height }}>
                <AnimatedSvg width={width * 2} {...{height}} style={{transform:[{translateX:translateX}]}}>
                    <Path {...{ d }} fill="white"/>
                </AnimatedSvg>
                <View style={StyleSheet.absoluteFill}>
                    <StaticTabbar {...{ tabs }} value={value}/>
                </View>
                <SafeAreaView style={styles.safeArea} />
            </View>
        </View>
    )
}
