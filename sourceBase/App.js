import React from 'react';
import { createAppContainer } from 'react-navigation'
import Navigator from './App/Navigation/index'
import Tab from './App/Components/BottomBar/Bottombar'

const Navigation = createAppContainer(Navigator)

export default class App extends React.Component {
  render() {
    return (
      <Tab/>
    )
  }
}

