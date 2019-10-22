/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import BasicFlat from './components/HookFlatList'
import configureStore from './redux/index'
import { Provider } from 'react-redux'
import { Text } from 'react-native'
const store = configureStore()

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
        <BasicFlat></BasicFlat>
    </Provider>
  );
};

export default App;
