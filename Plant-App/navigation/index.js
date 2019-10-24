import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Welcome from '../screens/Welcome'
import Browse from '../screens/Browse'
import Explore from '../screens/Explore'
import Setting from '../screens/Setting'
import Login from '../screens/Login'
import Product from '../screens/Product'

import { theme } from  '../constants'

const screens = createStackNavigator({

}, {
    defaultNavigationOptions: {
        headerStyle: {},
        headerBackImage: <Image />,
        headerBackTitle: null,
        headerLeftContainerStyle: {},
        headerRightContainerStyle: {},
    }
})

export default createAppContainer(screens)