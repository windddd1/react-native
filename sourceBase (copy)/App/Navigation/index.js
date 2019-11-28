import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Home from '../Containers/Home/Home'
import Splash from '../Containers/Splash/Splash'

import BottomBar from '../Components/BottomBar/Bottombar'

export default createBottomTabNavigator(
  {
    Home,
    Splash,
  },
  {
    tabBarComponent: props => (
      <BottomBar {...props} />
    ),
  }
)
