import React from 'react';
import { createAppContainer } from 'react-navigation'
import Navigator from './navigation/Navigator'
import configureStore from './redux/index'
import { Provider } from 'react-redux'

const store = configureStore()
const Navigation = createAppContainer(Navigator)

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Navigation />
            </Provider>
        );
    }
}

