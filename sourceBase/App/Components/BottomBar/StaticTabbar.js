import React from 'react'
import { StyleSheet, View, Dimensions, Text, Animated,TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

const { width } = Dimensions.get('window')

// eslint-disable-next-line no-undef
export default StaticTabbar = ({ tabs,value }) => {
  const values = tabs.map((tab, index) => new Animated.Value(index === 0 ? 1 : 0))
  const tabWidth = width / tabs.length
  const fadeIn = new Animated.Value(0)
  const fadeOut = new Animated.Value(1)
  const onPress = (index) => {
    Animated.sequence([
      Animated.parallel(
        values.map(v => Animated.timing(v, { //thay đổi giá trị của animated
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        })),
      ),
      Animated.parallel([
        Animated.spring(value, {
          toValue: tabWidth * index,
          useNativeDriver: true,
        }),
        Animated.spring(values[index], {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(fadeIn,{
          toValue: 0,
          duration: 3000,
        }),
      ]),
    ]).start();
  }
    return (
      <View style={styles.container}>
        {
          tabs.map(({name}, key ) => {
            const cursor = tabWidth * key
            const opacity = value.interpolate({
              inputRange: [cursor - tabWidth, cursor, cursor + tabWidth], // xác định khoảng giá trị ứng với animated
              // inputRange: [-width + tabWidth * (key - 1), -width + tabWidth * key, -width + tabWidth * (key + 1) ],
              outputRange: [1, 0, 1],     // xác định output để gán vào style
              extrapolate: 'clamp',
            })
            const translateY = values[key].interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
              extrapolate: 'clamp',
            });
            const opacity1 = values[key].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            })
            return (
              <React.Fragment key={key} >
                <TouchableWithoutFeedback onPress={() => onPress(key)}>
                  <Animated.View style={[styles.tab,{ opacity }]}>
                    <Icon size={25} name={name} />
                  </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => onPress(key)}>
                  <Animated.View style={[styles.containerIcon,{left: tabWidth * key,width: tabWidth,opacity: opacity1,
                    transform: [{ translateY }]}]}>
                    <View style={[styles.activeIcon]}>
                      <Icon size={25} name={name} iconStyle={{opacity:fadeIn}}/>
                    </View>
                  </Animated.View>
                </TouchableWithoutFeedback>
              </React.Fragment>
            )
          })
        }
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  activeIcon: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerIcon: {
    position: 'absolute',
    top: -8,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
