import React, { useState, useEffect, useMemo, Component } from 'react';
import { StyleSheet, StatusBar, View, Text, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native'


const { width, height } = Dimensions.get('screen')

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
})

// eslint-disable-next-line no-undef
export default Splash = (props) => {
  return (
    <View style={[styles.flex]}>
      <Text>456</Text>
    </View>
  )
}

