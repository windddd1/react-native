import React from 'react';
import { createAppContainer } from 'react-navigation'
import Navigator from './App/Navigation/index'

const Navigation = createAppContainer(Navigator)

export default class App extends React.Component {
  render() {
    return (
      <Navigation/>
    )
  }
}

