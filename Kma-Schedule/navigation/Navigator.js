import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Home from '../screens/Home'
import Schedule from '../screens/Schedule'
import Task from '../screens/Task'
import CreateInfo from '../screens/CreateInfo'
import BottomBar from '../components/BottomBar'

export default createBottomTabNavigator(
    {
        Home,
        Schedule,
        Task,
        CreateInfo,

    },
    {
        tabBarComponent: props => (
            <BottomBar {...props} />
        )
    }
);