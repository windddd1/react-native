/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Splash from './components/Splash'
import Login from './components/Login'
import configureStore from './redux/index'
import { Provider } from 'react-redux'

const store = configureStore()

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
        <Login></Login>
    </Provider>
  );
};

export default App;
